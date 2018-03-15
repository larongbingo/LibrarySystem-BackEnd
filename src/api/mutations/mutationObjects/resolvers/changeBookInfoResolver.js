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
import createResponse from "../helpers/createResponse";
import STATUS_MSG from "../helpers/statusCodes";
import verifyAccount from "../helpers/accountVerifier";
import updateFields from "../helpers/updateFields";
import ChangeInfoTransactionDetails from "../classes/transactions/ChangeInfoTransactionDetailsClass";
import UserResponse from "../classes/responses/UserResponseClass";
import Sequelize from "sequelize"; // Documentation Purposes

/**
 * Holds all of the fields that needs to be updated
 */
const ARG_FIELDS = [
    ["newTitle", "title"],
    ["newAuthor", "author"],
    ["newISBN", "ISBN"],
    ["newStatus", "isActive"]
];

/**
 * The string that represents this API
 */
const CHANGE_BOOK_INFO_TRANSACTION_TYPE = "CHANGE BOOK INFO";

/**
 * Handles all of the requests for the changeBookInfo API
 * @param {Object} root The default parameter of GraphQL
 * @param {Object} args The default paramter of GraphQL; holds all of the data passed  by the user from the client
 */
function resolve (root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0) {
            return verifyAndUpdate(
                data, 
                ARG_FIELDS, 
                args, 
                DB, 
                "book", 
                CHANGE_BOOK_INFO_TRANSACTION_TYPE
            );
        }
        else {
            return STATUS_MSG[String(data)];
        }
    });
}

/**
 * Creates a new transaction object
 * @param {String} transactionType The string that represents the API
 */
function insertTransactionObjectToDB(transactionType) {
    DB.models.transactions.create(
        new ChangeInfoTransactionDetails(
            data, 
            updatedFields, 
            transactionType
        )
    );
}

/**
 * Creates a new UserResponse object that should be sent to the user
 * @param {String} updatedFields The string that holds all of the fields that has been updated
 * @returns {UserResponse} The response that should be sent to the user
 */
function createUserResponse(updatedFields) {
    return new UserResponse(true, 0, {
        updatedFields: updatedFields
    });
}

// TODO: minimize param count
/**
 * Verifies and updates a book
 * @param {Object} data The data object from the verification 
 * @param {Object[]} arg_fields The fields that should be updated
 * @param {Object} args The object that holds all of the data from the user
 * @param {Sequelize} db The database object that holds the connection and models
 * @param {String} table_name The table that should be updated
 * @param {String} transactionType The name of the API
 * @returns {UserResponse} The response that should be sent to the user
 */
function verifyAndUpdate(data, arg_fields,args, db, table_name, transactionType) {
    if(data.isAdminOrStaff) {
        // Reset the log of changed fields
        let updatedFields = updateFields(data, ARG_FIELDS, args, db, "books");

        // Store to DB the changed fields
        insertTransactionObjectToDB(CHANGE_BOOK_INFO_TRANSACTION_TYPE);

        return createUserResponse(updatedFields);
    } 
    else {
        return STATUS_MSG["21"];
    }
}

export default resolve;