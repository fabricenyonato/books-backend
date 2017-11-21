const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const GraphQlDate = require('graphql-date');
const {
    insertBook,
    findBook,
    findBooks
} = require('./book.repository');
const Book = require('./book.model');
const {
    dbQuery,
    dbTransaction,
    dbCommit
} = require('../util/db');
const {AuthorType} = require('../author/author.schema');


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        publicationDate: {type: GraphQlDate},
        author: {type: AuthorType}
    }
});

const bookQueryFields = {
    findBook: {
        type: BookType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve(parentValue, args) {
            return findBook(args.id);
        }
    },
    findBooks: {
        type: new GraphQLList(BookType),
        resolve(parentValue, args) {
            return findBooks();
        }
    }
};


const bookMutationFields = {
    addBook: {
        type: BookType,
        args: {
            bookTitle: {type: new GraphQLNonNull(GraphQLString)},
            bookPublicationDate: {type: new GraphQLNonNull(GraphQlDate)},
            authorId: {type: GraphQLInt},
            authorName: {type: GraphQLString}
        },
        resolve(parentValue, args) {
            const params = {
                    book: {
                    title: args.bookTitle.trim(),
                    publicationDate: args.bookPublicationDate,
                },
                author: {id: undefined}
            };

            if (args.authorId) {
                params.author.id = args.authorId;

                return insertBook(params);
            } else if (args.authorName) {
                return dbTransaction()
                .then((db) => {
                    return dbQuery({
                        sql: 'INSERT INTO author(name) VALUES(?)',
                        values: [args.authorName.trim()]
                    })
                    .then((insertAuthorResult) => {
                        params.author.id = insertAuthorResult.insertId;

                        return insertBook(params)
                        .then((book) => {
                            return dbCommit()
                            .then(() => {
                                return book;
                            })
                        })
                        .catch((error) => {
                            db.rollback();
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        db.rollback(() => {
                            throw error;
                        });
                    });
                });
            }

            throw new Error('[authorId|authorName] is required' );
        }
    }
};


module.exports = {
    bookQueryFields,
    bookMutationFields
};
