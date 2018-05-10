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
import STATUS_MSG from "../helpers/statusCodes";
import verifyAccount from "../helpers/accountVerifier";
import MarkBookTransactionDetails from "../classes/transactions/MarkBookTransactionDetailsClass";
import UserResponse from "../classes/responses/UserResponseClass";

function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0) {
            // Find the book
            findOneBook(DB, args)
            .then(book => {
                return verifyAndUpdateBook(book, args, data, DB);
            })
        }
        else {
            return STATUS_MSG[String(data)];
        }
    });
}

function findOneBook(DB, args) {
    return DB.models.books.findOne({
        where: {
            id: args.bookId
        }
    })
}

function removeIdOnBook(book) {
    // Update Book
    book.update({
        userId: null
    });
}

function updateCounter(DB, book) {
    // Find the corresponding counters for the current book
    DB.models.bookViews.findOne({
        where: {
            id: book.id
        }
    })
    .then(updateUnreservesCounter);
}

function updateUnreservesCounter(bookView) {
    // Add one to the counter
    bookView.update({
        unreserves_count: bookView.unreserves_count + 1
    });
}

function verifyAndUpdateBook(book, args, data, DB) {
    // Check if the book exists
    if(!book) {
        return STATUS_MSG["17"];
    }

    // Check if the book.userId is STRICTLY equal to data.decoded.userId
    if(!book.userId || book.userId !== data.decoded.userId) {
        return STATUS_MSG["18"];
    }

    // Check if the book is not yet borrowed
    if(book.isBorrowed) {
        return STATUS_MSG["13"];
    }

    return updateBook(DB, book);
}

function updateBook(DB, book) {
    
    removeIdOnBook(book);

    // Find the corresponding counters for the current book
    updateCounter(DB, book);

    // Create the transaction object
    return createResponseAndInsertTransactionObject(DB);
}

function createResponseAndInsertTransactionObject(DB) {
    return DB.models.transactions.create(new MarkBookTransactionDetails(data, args, "UNRESERVE BOOK"))
    .then(transaction => {
        return new UserResponse(true, 0, {transactionId: transaction.id});
    });
}
export default resolve;