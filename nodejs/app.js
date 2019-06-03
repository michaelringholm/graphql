// imports
var express = require('express');
var express_graphql = require('express-graphql');
var graphql = require('graphql');

// local imports
var BookService = require('./BookService.js');

// variables
var courseType = {};
var queryType = {};
var schema = {};
var books = {};

startup();

function startup() {    
    defineTypes();
    defineQuery();
    defineSchema();
    cacheAllData();
};

function defineTypes() {
    // https://graphql.org/graphql-js/constructing-types/
    bookType = new graphql.GraphQLObjectType({
        name: 'Book',
        fields: {
            id: { type: graphql.GraphQLString },
            title: { type: graphql.GraphQLString },
            author: { type: graphql.GraphQLString },
            description: { type: graphql.GraphQLString },
        }
    });
};
  
function defineQuery() {
    queryType = new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            book: {
                type: bookType,
                args: {
                    id: { type: graphql.GraphQLString }
                },
                resolve: function (_, {id}) {
                    return books[id];
                }
            },
            booksByTitle: {
                type: new graphql.GraphQLList(bookType),
                args: {
                    title: { type: graphql.GraphQLString }
                },
                resolve: function (dummy, args, incomingMessage) {
                    return books.filter(b => b.title.toLowerCase().includes(args.title.toLowerCase()));
                }
            },            
            allBooks: {
                type: new graphql.GraphQLList(bookType),        
                resolve: function () {
                    return books;
                }
            }      
        }
    });
};

function defineSchema() {
    schema = new graphql.GraphQLSchema({query: queryType});
};

function cacheAllData() {
    var bookService = new BookService();
    books = bookService.getBooks();    
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    //rootValue: root,
    graphiql: true
}));

app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));