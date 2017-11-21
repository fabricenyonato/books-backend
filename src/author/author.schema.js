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
        name: {type: GraphQLString}
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
            author.name = 'Fkdvgd YUDSI';

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
    authorQueryFields,
    AuthorType
};
