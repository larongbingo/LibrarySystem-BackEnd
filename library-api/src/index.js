import Express from "express";
import CORS from "cors";
import API_Schema from "./api/graphql";
import GraphqlHTTP from "express-graphql";

const App = Express();

// Enables all Routes to have CORS Requests 
App.use(CORS());

App.use("/api", GraphqlHTTP({
    schema: API_Schema
}));

App.use("/graphiql", GraphqlHTTP({
    schema: API_Schema,
    graphiql: true
}));

App.listen(
    process.env.PORT || 8080,
    process.env.HOST || "127.0.0.1",
    () => {
        console.log("Server is running");
    } 
)