/**
 * users.js
 * Defines the table that represents a user
 */

import { STRING } from "sequelize";
import DB from "../dbConn";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

export default DB.define("users", {
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    userID: {
        type: STRING,
        allowNull: false
    },
    userType: {
        type: STRING,
        allowNull: false
    },
    username: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    }
})