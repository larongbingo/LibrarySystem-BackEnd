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

import DB from "../../../../db/dbMap";
import JWT from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import STATUS_CODES from "../helpers/statusCodes";
import UserResponse from "../classes/responses/UserResponseClass";

/**
 * Resolver or handler for the logIn route
 * @param {Object} root The default parameter of GraphQL
 * @param {Object} args The default parameter of GraphQL; holds all of the data that was passed by the user
 */
function resolve(root, args) {
    return findUser(args)
    .then(user => {
        if(!user) {
            return STATUS_CODES["9"]; 
        }

        return verifyPasswordHashes(args, user);
    })
}

/**
 * Verifies if the password given by the user matches with password stored in the database
 * @param {Object} args The args argument of the resolve function
 * @param {Object} user The user instance in findUser function
 * @returns {UserResponse} The response that should be sent to the user
 */
function verifyPasswordHashes(args, user) {
    if(compareSync(args.password, user.password)) {
        insertHashToDB(createHash(user));
        return new UserResponse(true, 0, {token: createHash(user), position: user.userType});
    }
    
    return STATUS_CODES["11"];     
}

/**
 * Returns a new promise object that searches for an account using the username
 * @param {Object} args The args argument of resolve function
 * @returns {Promise} The object that handles the async search of the account
 */
function findUser(args) {
    return DB.models.users.findOne({
        where: {
            username: args.username
        }
    })
}

/**
 * Stores the given hash string to sessions table
 * @param {String} hash The hash string that needs to be added to sessions table
 */
function insertHashToDB(hash) {
    DB.models.sessions.create({
        token: hash
    });
}

/**
 * Creates a new hash string based on the uesr object
 * @param {Object} user The instance of user that came from sequelize
 * @returns {String} The hash string
 */
function createHash(user) {
    return JWT.sign({
        username: user.username,
        userId: user.id,
        position: user.userType
    }, process.env.SECRET_KEY);
}

export default resolve;