/**
 * index.js
 * Holds all of the settings and data for managing the 
 * server, routes and requests
 */

import Express from "express";
import CORS from "cors";
import API_Schema from "./api/graphql";
import GraphqlHTTP from "express-graphql";
import Morgan from "morgan";
import NodeCleanup from "node-cleanup";
import DB from "./db/dbMap";
import cfEnv from "cfenv";

const App = Express();

DB.models.sessions.findAll()
.then(sessions => {
    sessions.forEach((session, i) => {
        console.log(session);
        session.destroy();
    })
})

// Enables all Routes to have CORS Requests 
App.use(CORS());

// Log all HTTP Requests to console
App.use(Morgan("combined"));

// Route for the GraphQLHTTP middleware
App.use("/api", GraphqlHTTP({
    schema: API_Schema
}));

// Route for GraphQLHTTP middleware with Graphiql for testing
App.use("/graphiql", GraphqlHTTP({
    schema: API_Schema,
    graphiql: true
}));

App.get("/", function(req, res, next) {
    res.send("<h1>This is the API server of the Library System</h1>")
});

// Make the server run
const hostEnv = cfEnv.getAppEnv();

let PORT = 3000;
let HOST = "127.0.0.1";

if(!hostEnv.isLocal) {
    PORT = hostEnv.port;
    HOST = hostEnv.host;
}

App.listen(PORT, HOST, () => {
    console.log(`Server starting at port ${PORT} and at host ${HOST}`);
});

NodeCleanup(function(exitCode, cleanup) {
    console.log("Exiting!");
    DB.close();
})