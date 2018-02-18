# Library API
This is the API Server of the Library System.

## Stack
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
* MySQL (Any SQL Client will do, as long as you change `dialect` at `src/db/dbConn`)

## Set Up
1. Create the MySQL Database and name it `LibrarySystems`
2. Run `npm install` to install app dependencies
3. Run `npm run db-sync` to add test data and create the tables to the database.
4. Run `npm run start` to build and start the API Server.