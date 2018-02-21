/**
 * users.js
 * Defines the table that represents a user
 */

import { STRING } from "sequelize";
import { hashSync } from "bcryptjs";
import DB from "../dbConn";

const Users = DB.define("users", {
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
}, {
    hooks: {
        beforeCreate: (user, options) => {
            user.password = hashSync(user.password);
        }
    }
});

export default Users;