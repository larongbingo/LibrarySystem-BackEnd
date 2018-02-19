/**
 * dbConn.js
 * Defines the connection between the ORM and the Database
 */

import Sequelize from "sequelize";

let conn;

if(process.env.NODE_ENV === "production") {
    conn = new Sequelize("LibrarySystems", "admin", "b0bski123", {
        host: "sl-us-south-1-portal.19.dblayer.com",
        port: "35234",
        dialect: "mysql"
    });
}
else {
    conn = new Sequelize("LibrarySystems", "root", "root", {
        dialect: "mysql"
    });
}

export default conn;