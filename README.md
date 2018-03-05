# Library API
This is the API Server of the Library System.

Licensed using GNU AGPL-3.0+

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

## License
The Library System Back End, handles all of the CRUD operations
of the CvSU Imus Library System
Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.