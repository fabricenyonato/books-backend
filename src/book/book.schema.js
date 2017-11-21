const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const GraphQlDate = require('graphql-date');
const Book = require('./book.model');
const dbQuery = require('../util/db');


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        publicationDate: {type: GraphQlDate}
    }
});

const bookQueryFields = {
    getBookById: {
        type: BookType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve(parentValue, args) {
            return dbQuery({
                sql: `SELECT * FROM book WHERE id=?`,
                values: [args.id]
            })
            .then((results) => {
                if (results.length > 0) {
                    const book = new Book();
                    book.id = results[0].id;
                    book.title = results[0].title;
                    book.publicationDate = new Date(results[0].publication_date);

                    return book;
                }

                throw new Error('Book not found');
            });
        }
    },
    getBooks: {
        type: new GraphQLList(BookType),
        resolve(parentValue, args) {
            return dbQuery('SELECT * FROM book')
            .then((results) => {
                const books = [];

                for (const result of results) {
                    const book = new Book();
                    book.id = result.id;
                    book.title = result.title;
                    book.publicationDate = new Date(result.publication_date);

                    books.push(book);
                }

                return books;
            });
        }
    }
};

module.exports = {
    bookQueryFields
};
