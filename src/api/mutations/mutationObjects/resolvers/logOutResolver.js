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
import UserResponse from "../classes/responses/UserResponseClass"
import STATUS_CODES from "../helpers/statusCodes";

/**
 * The handler of all requests for the logOut API
 * @param {Object} root The default parameter of GraphQL
 * @param {Object} args The default parameter of GraphQL; holds all of the data that was passed by the user
 */
function resolve(root, args) {
    if(verifyToken(args.token)) {
        return findAndDestroySession(args);
    }

    return STATUS_CODES["3"];
}

/**
 * Checks if the given string is a valid JWT String
 * @param {String} token The token that needs to be checked
 * @returns {Boolean} True if the string is valid, false otherwise
 */
function verifyToken(token) {
    return JWT.verify(token, process.env.SECRET_KEY, null, (err, decoded) => {
        if(err || !decoded) {
            return false;
        }

        return true;
    });
}

/**
 * Finds ONE Session Entry at sessions table
 * @param {Object} args The default parameter of GraphQL
 */
function findOneSession(args) {
    return DB.models.sessions.findOne({
        where: {
            token: args.token
        }
    })
}

/**
 * Deletes or destroys the given session object
 * @param {Object} session The session instance from sessions table
 * @returns {UserResponse} The response object that should be sent to the user
 */
function destroySession(session) {
    return session.destroy()
    .then(() => {
        return new UserResponse(true, 0, {message: "Logged out successfully"});
    });
}

/**
 * Finds the session in the sessions table and destroys the found session
 * @param {Object} args The default parameter of GraphQL
 */
function findAndDestroySession(args) {
    return findOneSession(args)
    .then(session => {
        if(!session) {
            return STATUS_CODES["12"];
        }

        return destroySession(session);
    });
}

export default resolve;