const port = 2017;
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');


const app = express();

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});