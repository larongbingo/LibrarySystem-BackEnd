/*************************************************************************
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *************************************************************************/

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