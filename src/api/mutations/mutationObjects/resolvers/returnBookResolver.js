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
import createResponse from "../helpers/createResponse";
import verifyAccount from "../helpers/accountVerifier";
import STATUS_MSG from "../helpers/statusCodes";
import TransactionUserResponse from "../classes/responses/TransactionUserResponseClass";
import StaffBorrowReturnTransactionDetails from "../classes/transactions/StaffBorrowReturnTransactionDetailsClass";

/**
 * Handles and resolves all of the requests for returnBook API
 * @param {Object} root The default parameter of GraphQL Resolvers
 * @param {Object} args The default parameter of GraphQL Resolvers; holds data passed by the user
 */
function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0) {
            return verifyAndUpdateBook(DB, args);
        }
        else {
            return STATUS_MSG[String(data)];
        }
    });
}

/**
 * Verifies if the book is borrowed and not reserved,
 * then updates the book as returned
 * @param {Object} DB The database connection object from Sequelize
 * @param {Object} args The object that holds all fo the data passed by the user
 */
function verifyAndUpdateBook(DB, args) {
    // Find and update the book
    return findOneBook(DB, args)
    .then(book => {
        return findOneBookHandler(book, DB, args);
    });
}

/**
 * Handles the query result of findOneBook
 * @param {Object} book The instance of book in Books Table
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} args The object that holds all of the data passed by the user
 * @returns {TransactionUserReponse} The object that holds the result of the API for the user
 */
function findOneBookHandler(book, DB, args) {
    // Check if the userId in the book is the same as the requesting account
    if(!(book.userId === args.userId)) {
        return STATUS_MSG["14"];
    }

    // Check if the book is borrowed
    if(!book.isBorrowed) {
        return STATUS_MSG["15"];
    }

    return updateAndInsertTransactionObject(book, DB, args);
}

/**
 * Updates the book and inserts a transaction object to the database
 * @param {Object} book The instance of book from the Books Table
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} args The object that holds all of the data passed by the user
 * @returns {TransactionUserResponse} The object that represents the message for the user
 */
function updateAndInsertTransactionObject(book, DB, args) {
    updateBook(book);

    // Find the counter that corresponds to the book
    updateCounter(DB, book);

    // Create the transaction object
    return storeEntryAndCreateResponse(args, DB);
}

/**
 * Finds a book from the database using the id passed by the user
 * @param {Sequelize} DB The database connection object
 * @param {Object} args The objet that holdsa all of the data passed by the user
 * @returns {Promise} The async function that holds the result of the query
 */
function findOneBook(DB, args) {
    return DB.models.books.findOne({
        where: {
            id: args.bookId
        }
    });
}

/**
 * Stores the transaction event and creates a UserResponse for the user
 * @param {Object} args The object that holds the data passed by the user
 * @param {Sequelize} DB The database connection object from Sequelize
 * @returns {TransactionUserResponse} The object that holds the message for the user
 */
function storeEntryAndCreateResponse(args, DB) {
    // Create the transaction object
    return DB.models.transactions.create(new StaffBorrowReturnTransactionDetails(args, "RETURNING BOOK"))
    .then(transaction => {
        // Send response to user
        return new TransactionUserResponse(transaction)
    });
}

function updateCounter(DB, book) {
    // Find the counter that corresponds to the book
    DB.models.bookViews.findOne({
        where: {
            id: book.id
        }
    })
    .then(updateReturnsCounter);
}

function updateReturnsCounter(bookView) {
    bookView.update({
        returns_count: bookView.returns_count + 1
    });
}

function updateBook(book) {
    book.update({
        isBorrowed: false,
        userId: null
    });
}

function insertTransactionToDB(DB, args) {
    // Create the transaction object
    return DB.models.transactions.create(new StaffBorrowReturnTransactionDetails(args, "RETURNING BOOK"))
    .then(transaction => {
        // Send response to user
        return new TransactionUserResponse(transaction);
    });
}

export default resolve;