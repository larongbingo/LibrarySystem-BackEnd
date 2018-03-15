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
import STATUS_MSG from "../helpers/statusCodes";
import MarkBookTransactionDetails from "../classes/transactions/MarkBookTransactionDetailsClass";

/**
 * The handler or resolver of the reserveBook API
 * @param {Object} root The default parameter of GraphQL
 * @param {Object} args The default parameter of GraphQL; holds all of the data passed by the user
 */
function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0) {
            return findVerifyAndUpdateBook(DB, data, args);
        }
        else {
            return STATUS_MSG[String(data)];
        }
    });
}

/**
 * Finds a book entry from the database
 * @param {Object} args The object that holds all of the data passed by the user
 * @returns {Promise} The async function that holds all of the results of the query
 */
function findOneBook(args) {
    return DB.models.books.findOne({
        where: {
            id: args.bookId
        }
    });
}

/**
 * Updates the counters from the bookViews Table
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} book The instance of Book from the database 
 */
function updateCounter(DB, book) {
    DB.models.bookViews.findOne({
        where: {
            id: book.id
        }
    })
    .then(updateReservesCount);
}

/**
 * Updates the reserves counter for analytics
 * @param {Object} bookView The instance of bookView from the database
 */
function updateReservesCount(bookView) {
    // Update the counter
    bookView.update({
        reserves_count: bookView.reserves_count + 1
    });
}

/**
 * Inserts a new Transaction Object to Transactions Table
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} data The result of account verification and decoding
 * @param {Object} args The data passed by the user from GraphQL
 * @returns {UserResponse} The object that represents a message to the user
 */
function insertTransactionObjectToDB(DB, data, args) {
    // Create a record to transactions table
    return DB.models.transactions.create(
        new MarkBookTransactionDetails(data, args, "RESERVE BOOK")
    )
    .then(transaction => {
        return new UserResponse(true, 0, {
            transaction: transaction.id
        });
    });
}

/**
 * Verify the request and updates the book if the book is not yet
 * borrowed or reserved
 * @param {Object} book The instance of book from Books Table
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} data The result of account verification
 * @param {Object} args The data passed by the user from GraphQL
 * @returns {UserResponse} The object that represents a message to the user
 */
function verifyAndUpdateBook(book, DB, data, args) {
    // Check if the book does exist
    if(!book) {
        return STATUS_MSG["17"];
    }

    // Check if the book is not reserved or borrowed by anyone
    if(book.userId || book.isBorrowed) {
        return STATUS_MSG["13"];
    }

    return updateBook(book, DB, data, args);
}

/**
 * Finds the book, verifies if the book is not yet borrowed or reserved
 * then updates the book if not yet borrowed or reserved
 * @param {Sequelize} DB The database connection object from Sequelize
 * @param {Object} data The result from account verification
 * @param {Object} args The data passed by the user from GraphQL
 * @returns {UserResponse} The object that represents the data for the user
 */
function findVerifyAndUpdateBook(DB, data, args) {
    return findOneBook(args)
    .then(book => {
        return verifyAndUpdateBook(book, DB, data, args);
    });
}

function updateBook(book, DB, data, args) {
    // Update Book to reserved
    book.update({
        userId: data.decoded.userId
    });

    // Find the book
    updateCounter(DB, book);
    
    // Returns null
    return insertTransactionObjectToDB(DB, data, args);
}

export default resolve;