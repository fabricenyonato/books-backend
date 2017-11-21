const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');
const {bookQueryFields} = require('../book/book.schema');
const {authorQueryFields} = require('../author/author.schema');

let fields = {};

for (const query of [
    bookQueryFields,
    authorQueryFields
]) {
    fields = Object.assign(fields, query);
}

const query = new GraphQLObjectType({
    name: 'Query',
    fields
});


module.exports = new GraphQLSchema({
    query
});
