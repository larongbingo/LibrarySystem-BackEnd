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
import verifyAccount from "../helpers/accountVerifier";
import STATUS_MSG from "../helpers/statusCodes";
import TransactionUserResponse from "../classes/responses/TransactionUserResponseClass";
import MarkBookTransactionDetails from "../classes/transactions/MarkBookTransactionDetailsClass";

/**
 * The resolver for all requests in the borrowBook API
 * @param {Object} root The default parameter at GraphQL
 * @param {Object} args The default parameter at GraphQL; holds all of the data send by the user
 */
function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0) {
            
            // Check if the accoun is ADMIN or STAFF
            if(!data.isAdminOrStaff) {
                return STATUS_MSG["8"];
            }

            // Query for the book
            return findVerifyAndUpdateBook(args);
        }
        else {
            return STATUS_MSG[String(data)];
        }
    });
}

/**
 * Updates the book's counter at update
 * @param {Object} book The instance of the book passed by Sequelize
 */
function addOneToBorrowsCounter(book) {
    DB.models.bookViews.findOne({
        where: {
            id: book.id
        }
    })
    .then(bookView => {
        bookView.update({
            borrows_count: bookView.borrows_count + 1
        });
    });
}

/**
 * Updates the borrowed status of a book
 * @param {Object} book The instance of the book passed by Sequelize
 * @param {Object} args The data passed by the user through GraphQL
 */
function updateBook(book, args) {
    book.update({
        isBorrowed: true,
        userId: args.userId
    })
}

/**
 * Inserts a new transaction object at transactions table
 * @param {Object} args The data passed by the user through GraphQL
 * @returns {TransactionUserResponse} The response that should be sent to the user
 */
function insertTransactionToDB(args) {
    const BORROW_BOOK = "BORROWING BOOK";
    
    // Create transaction object
    return DB.models.transactions.create(new MarkBookTransactionDetails(args, BORROW_BOOK))
    .then(transaction => {
        // Send a response to the user that marking book borrowed is complete
        return new TransactionUserResponse(transaction);
    });
}

/**
 * Finds the book object at the database
 * @param {Object} args The data passed by the user through GraphQL
 * @returns {Promise} The data async function that returns the results
 */
function findOneBook(args) {
    return DB.models.books.findOne({
        where: {
            id: args.bookId
        }
    })
}

/**
 * Verifies and update the book
 * @param {Object} book The instance of the book passed by Sequelize
 * @param {Object} args The data passed by the user through GraphQL
 * @returns {UserResponse} The response that should be sent to the user
 */
function verifyAndUpdateBook(book, args) {
    // Check if the book exists in the database
    if(!book) {
        return STATUS_MSG["17"];
    }

    // Check if the book is not borrowed or reserved id is not the same as the one on the args object 
    // and is not null
    else if((book.userId !== args.userId && args.userId) || book.isBorrowed) {
        return STATUS_MSG["13"];
    }

    else {
        updateBook(book, args);

        addOneToBorrowsCounter(book);

        return insertTransactionToDB(args);
    }
}

function findVerifyAndUpdateBook(args) {
    // Query for the book
    return findOneBook(args)
    .then(book => {
        return verifyAndUpdateBook(book, args);
    });
}

export default resolve;