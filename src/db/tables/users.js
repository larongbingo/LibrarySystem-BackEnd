/**
 * users.js
 * Defines the table that represents a user
 * 
 * Columns:
 * firstName - The firstname of the user
 * lastName - The lastname of the user
 * userID - The userID of the user (optional)
 * userType - Type of the account ("USER", "STAFF", "ADMINISTRATOR")
 * username - The username of the account
 * password - The hash of the password of the account
 * isActive - Indicates whether the account has been deleted (true is not deleted, false is deleted)
 */

import { STRING, BOOLEAN, ENUM } from "sequelize";
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
            allowNull: true
        },
        userType: {
            type: ENUM("USER", "STAFF", "ADMINISTRATOR"),
            allowNull: false
        },
        username: {
            type: STRING,
            allowNull: false
        },
        password: {
            type: STRING,
            allowNull: false
        },
        isActive: {
            type: BOOLEAN,
            allowNull: false
        }
    }, 
    {
    hooks: {
        beforeValidate: (user, options) => {
            if(user.password)
                user.password = hashSync(user.password);
        },
        beforeCreate: (user, options) => {
            user.isActive = true;
        }
    }
});

export default Users;