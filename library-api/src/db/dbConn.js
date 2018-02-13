/**
 * dbConn.js
 * Defines the connection between the ORM and the Database
 */

import Sequelize from "sequelize";

export default new Sequelize("librarySystems", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});