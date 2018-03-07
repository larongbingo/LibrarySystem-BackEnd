/**
 * index.js
 * Holds all of the settings and data for managing the 
 * server, routes and requests
 * 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Express from "express";
import CORS from "cors";
import API_Schema from "./api/graphql";
import GraphqlHTTP from "express-graphql";
import Morgan from "morgan";
import NodeCleanup from "node-cleanup";
import DB from "./db/dbMap";
import cfEnv from "cfenv";

NodeCleanup(function(exitCode, cleanup) {
    console.log(`Exiting! Exit Code at ${exitCode} and CleanUp at ${cleanup}`);
    DB.close();
});

const App = Express();

DB.models.sessions.findAll()
.then(sessions => {
    sessions.forEach(function(session) {
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

const hostEnv = cfEnv.getAppEnv();

let PORT = 3000;
let HOST = "127.0.0.1";

if(!hostEnv.isLocal) {
    PORT = hostEnv.port || process.env.PORT;
    HOST = hostEnv.bind || process.env.HOST;
}

// Make the server run
App.listen(PORT, HOST, () => {
    console.log(`Server starting at port ${PORT} and at host ${HOST}`);
    console.log(`Mode at ${process.env.NODE_ENV}`);
});

