const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');
const {
    bookQueryFields,
    bookMutationFields
} = require('../book/book.schema');
const {authorQueryFields} = require('../author/author.schema');

let queryFields = {};
let mutationFields = {};

for (const query of [
    bookQueryFields,
    authorQueryFields
]) queryFields = Object.assign(queryFields, query);

for (const mutation of [
    bookMutationFields
]) mutationFields = Object.assign(mutationFields, mutation);


const query = new GraphQLObjectType({
    name: 'Query',
    fields: queryFields
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutationFields
});


module.exports = new GraphQLSchema({
    query,
    mutation
});
