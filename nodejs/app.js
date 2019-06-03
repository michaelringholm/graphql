// imports
var express = require('express');
var express_graphql = require('express-graphql');
var graphql = require('graphql');

// variables
var courseType = {};
var queryType = {};
var schema = {};
var coursesData = {};

setupSchema();

function setupSchema() {
    defineTypes();
    defineQuery();
    defineSchema();
    cacheAllData();
};

function defineTypes() {
    // https://graphql.org/graphql-js/constructing-types/
    courseType = new graphql.GraphQLObjectType({
        name: 'Course',
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
            course: {
                type: courseType,
                args: {
                    id: { type: graphql.GraphQLString }
                },
                resolve: function (_, {id}) {
                    return coursesData[id];
                }
            },
            coursesByTitle: {
                type: new graphql.GraphQLList(courseType),
                args: {
                    title: { type: graphql.GraphQLString }
                },
                resolve: function (dummy, args, incomingMessage) {
                    return coursesData.filter(course => course.title.toLowerCase().includes(args.title.toLowerCase()));
                }
            },            
            allCourses: {
                type: new graphql.GraphQLList(courseType),        
                resolve: function () {
                    return coursesData;
                }
            }      
        }
    });
};

function defineSchema() {
    schema = new graphql.GraphQLSchema({query: queryType});
};

function cacheAllData() {
    coursesData = [
        {
            id: 1,
            title: 'The Complete Node.js Developer Course',
            author: 'Andrew Mead, Rob Percival 27',
            description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
            topic: 'Node.js',
            url: 'https://codingthesmartway.com/courses/nodejs/'
        },
        {
            id: 2,
            title: 'Node.js, Express & MongoDB Dev to Deployment',
            author: 'Brad Traversy',
            description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
            topic: 'Node.js',
            url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
        },
        {
            id: 3,
            title: 'JavaScript: Understanding The Weird Parts',
            author: 'Anthony Alicea',
            description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
            topic: 'JavaScript',
            url: 'https://codingthesmartway.com/courses/understand-javascript/'
        }
    ]
};

function old() {
    var getCourse = function(args) { 
        var id = args.id;
        return coursesData.filter(course => {
            return course.id == id;
        })[0];
    }
    var getCourses = function(args) {
        if (args.topic) {
            var topic = args.topic;
            return coursesData.filter(course => course.topic === topic);
        } else {
            return coursesData;
        }
    }
    var root = {
        course33: getCourse,
        courses55: getCourses
    };
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    //rootValue: root,
    graphiql: true
}));

app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));