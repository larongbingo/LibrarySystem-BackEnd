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
import UserResponse from "../classes/responses/UserResponseClass";
import verifyAccount from "../helpers/accountVerifier";
import RegularUserDetails from "../classes/accounts/RegularUserDetailsClass";
import StaffUserDetails from "../classes/accounts/StaffUserDetailsClass";
import STATUS_CODES from "../helpers/statusCodes";

/**
 * Handles the request at addUser 
 * @param {Object} root The default parameter for the GraphQL Resolvers
 * @param {Object} args The default parameter for the GraphQL Resolvers; holds all of the parameters passed by the user or client
 */
function resolve(root, args) {
    // Check if it has a token
    if(args.token) {
        // check and create a new admin account
        return verifyAndCreateStaffAccount(args);
    }
    
    // If there's no token, create a regular account
    return createRegularUserAccount(args);
}

/**
 * Creates a proper response once a new user object has been created
 * @param {Object} user The instance of user class in the database
 * @returns {Object} The response object to the client
 */
function accountCreatedResponse(user) {
    return new UserResponse(true, 0, {userId: user.id});
}

/**
 * Creates a new non administrative account
 * @param {Object} args The data in the GraphQL API
 * @returns {Object} The response to the client or user
 */
function createUserAccount(args, accountType) {
    if(checkUsernames(args.username)) {
        return verifyAndCreateAccount(args, accountType);
    }
    else {
        return STATUS_CODES["6"];
    }
}

function createRegularUserAccount(args) {
    return DB.models.users.create(new RegularUserDetails(args))
    .then(accountCreatedResponse);
}

// TODO: Check if this function doesn't have any references
function verifyAndCreateAccount(args, accountType) {
    if(accountType === 1) {
        return DB.models.users.create(new StaffUserDetails(args))
        .then(accountCreatedResponse);
    }

    return DB.models.users.create(new RegularUserDetails(args))
    .then(accountCreatedResponse);
}

/**
 * Checks and Creates a new StaffUserDetails,
 * returns a StaffUserDetails if its not an admin account
 * @param {Object} args The data in the GraphQL API
 * @returns {Object} The response to the client or user
 */
function verifyAndCreateStaffAccount(args) {
    // Check if the token is valid
    return verifyAccount(args.token) 
    .then(data => {
        // Check if theres no error and the account is ADMINISTRATOR
        if(data.status_code === 0 && data.decoded.position === "ADMINISTRATOR") {
            return createUserAccount(args, 1);
        }
        
        return createUserAccount(args, 2);
    }); 
}
// TODO: ADD THE FUNCTION AT createStaffUserAccount and createRegularUserAccount
/**
 * Checks all of the users to see if some account has the same username
 * @param {String} username The username that needs to be checked
 * @returns {Boolean} True if theres no other account that has the 
 * same username, false otherwise
 */
function checkUsernames(username) {
    return DB.models.users.findAll({
        where: {
            username: username
        }
    })
    .then(users => {
        return !arrayHasElements(users);
    });
}

/**
 * Checks whether a given array has elements or not
 * @param {Array} array The array that needs to be checked
 * @returns {Boolean} True if the array has elements, false otherwise
 */
function arrayHasElements(array) {
    if(!array || array.length === 0) {
        return true;
    }

    return false;
}

export default resolve;