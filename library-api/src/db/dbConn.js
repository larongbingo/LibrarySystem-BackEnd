/**
 * dbConn.js
 * Defines the connection between the ORM and the Database
 */

import Sequelize from "sequelize";

export default new Sequelize("LibrarySystems", "admin", "b0bski123", {
    host: "sl-us-south-1-portal.19.dblayer.com",
    port: "35234",
    dialect: "mysql"
});