/**
 * dbConn.js
 * Defines the connection between the ORM and the Database
 */

import Sequelize from "sequelize";

let conn;

// Assign the database connection to the IBM Cloud if for production
if(process.env.NODE_ENV === "production") {
    conn = new Sequelize("LibrarySystems", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: "mysql"
    });
}
else {
    conn = new Sequelize("LibrarySystems", "root", "root", {
        dialect: "mysql"
    });
}

export default conn;