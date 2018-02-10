# Library-System
Project in Management Information System (DCIT101)

Its made of 2 servers. Public API and React App.

## Notes
You must install the following to run the server:
* NodeJS (includes NPM)
* MySQL Client (Any SQL Client is ok, as long you change the `dialect` at `./library-api/db/dbConn.js`)

## Stack
* Front End (library-web-app)
    * NodeJS(Server Language)
        * React (Front End Framework)
            * React Router v4 (Routing)
            * React Bootstrap (Bootstrap Components)
        * Axios (Fetching and Sending Data)
        * Serve (Serving Static Files)
* Back End (library-api)
    * NodeJS (Server Language)
        * Express (Routing)
        * GraphQL (RESTful API)
            * Express-Graphql (Middleware for handling queries of GraphQL APIs)
            * Graphiql (Middleware for testing GraphQL APIs)
            * GraphQL-Type-JSON (A custom GraphQL Data Type that lets routes send and recieve JSON)
            * JWT (Tokens for POST Requests)
        * Sequelize (ORM)
        * Morgan (Logging HTTP Requests)
        * CORS (Allowing CORS Requests)
        * Rimraf (Deleting Build Files)
        * Faker (Generating Testing Data)
        * Lodash 
        * MySQL2 (MySQL Driver)
    * MySQL
    
Both servers use Babel for transpiling.

## Contributors
* Renz Christen Yeomer A. Pagulayan
* Michael Casals
* Joshua Albert Vilanueva
* Sache Aclan
* Mark Louie Cipriano