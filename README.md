# Library API
This is the API Server of the Library System.

Licensed using MIT

## Stack
* NodeJS (Server Language)
    * Express (Routing)
    * GraphQL (RESTful API)
        * Express-Graphql (Middleware for handling queries of GraphQL APIs)
        * Graphiql (Middleware for testing GraphQL APIs)
        * GraphQL-Type-JSON (A custom GraphQL Data Type that lets routes send and recieve JSON)
        * JWT (Tokens for POST Requests)
    * Sequelize (ORM)
        * MySQL2 (MySQL Driver)
        * BcryptJS (Password Hashing)
    * Morgan (Logging HTTP Requests)
    * CORS (Allowing CORS Requests)
    * Rimraf (Deleting Build Files)
    * Faker (Generating Testing Data)
    * Lodash (Common JS Functions)
    * Webpack (Transpiling and Compression of ES2017 Scripts)
    * Node-Cleanup (Force Exits and Crash Detection)
* MySQL (Any SQL Client will do, as long as you change `dialect` at `src/db/dbConn`)

## Set Up
1. Create the MySQL Database and name it `LibrarySystems`
2. Run `npm install` to install app dependencies
3. Run `npm run build` to build the server and the script for syncing all of the tables.
4. Run `npm run db-sync` to add the tables and the admin account or run `npm run db-rand` to add random test data.
5. Run `npm run start` to start the API Server.

## NPM Scripts
* `npm run build`
    * Builds the API Server, database tables syncing, and random data generation scripts.
    * If there's an environment variable called NODE_ENV and has a value of 'production' it will use the values at DB_HOSTNAME, DB_PORT, DB_USERNAME, and DB_PASSWORD
* `npm run start`
    * Starts the API Server
* `npm run db-cli`
    * Starts the MySQL CLI using the credentials(username and password) stored as an environment variable. (This assumes that you are using a Windows OS since it uses %% to get the environment variables)
* `npm run db-sync`
    * Stores all of the tables into database, and stores the admin credentials into users with a default username and password.
* `npm run db-rand`
    * Same as the `npm run db-sync`, but it adds random test data to Users and Books Table.