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
import STATUS_MSG from "../helpers/statusCodes";
import verifyAccount from "../helpers/accountVerifier";
import UserResponse from "../classes/responses/UserResponseClass";
import ChangeInfoTransactionDetails from "../classes/transactions/ChangeInfoTransactionDetailsClass";
import updateFields from "../helpers/updateFields";  

/**
 * All of the fields that needs to be updated if need be
 */
const ARG_FIELDS = [
    ["newFirstName", "firstName"],
    ["newLastName", "lastName"],
    ["newUserID", "userID"],
    ["newUsername", "username"],
    ["newPassword", "password"]
];

const CHANGE_ACCOUNT_INFO_TRANSACTION_TYPE = "CHANGE ACCOUNT INFO";

/**
 * Handles the requests at chagenAccountInfo API
 * @param {Object} root The default parameter of GraphQL
 * @param {Object} args The default parameter of GraphQL; holds the data passed by the user
 */
function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if (data.status_code === 0) {
            return updateAccount(data, ARG_FIELDS, args);
        }
        
        return STATUS_MSG[String(data)];
    })
}

/**
 * Destroys the given token string at the sessions table
 * @param {Object} args The default parmeter of GraphQL
 */
function destroyToken(args) {
    // Delete current token of user from sessions
    DB.models.sessions.destroy({
        where: {
            token: args.token
        }
    });
}

/**
 * Creates a new entry at transaction table regarding about the update
 * @param {Object} data The result of account verification async function
 * @param {Object} updatedFields The string of columns that was updated
 */
function createTransactionEntry(data, updatedFields) {
    // Store to DB the changed fields
    DB.models.transactions.create(
        new ChangeInfoTransactionDetails(
            data, 
            updatedFields, 
            CHANGE_ACCOUNT_INFO_TRANSACTION_TYPE
        )
    );
}

/**
 * Updates the account's user info
 * @param {Object} data The results of account verification
 * @param {Array} args_array The array that holds all of the fields that needs to be updated
 * @param {Object} args The default parameter of GraphQL that holds all of the user passed data
 * @returns {UserResponse} The data that needs to be sent to the user
 */
function updateAccount(data, args_array, args) {
    let updatedFields = updateFields(data, args_array, args, DB, "users");

    createTransactionEntry(data, updatedFields);

    destroyToken(args);

    // Send to client of the result
    return new UserResponse(true, 0, {
        updatedFields: updatedFields
    });
}

export default resolve;