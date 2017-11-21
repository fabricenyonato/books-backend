const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const Author = require('./author.model');


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString}
    }
});

const authorQueryFields = {
    getAuthorById: {
        type: AuthorType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve(parentValue, args) {
            const author = new Author();
            author.id = args.id;
            author.firstName = 'First Name';
            author.lastName = 'LASTNAME';

            return author;
        }
    },
    getAuthors: {
        type: new GraphQLList(AuthorType),
        resolve(parentValue, args) {
            return [];
        }
    }
};

module.exports = {
    authorQueryFields
};
