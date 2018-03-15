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
import BookDetails from "../classes/books/BooksDetailsClass";
import UserResponse from "../classes/responses/UserResponseClass";

/**
 * The resolver of the addBook API
 * @param {Object} root Default parameter of GraphQL
 * @param {Object} args Default parameter of GraphQL, stores all of the passed parameters
 */
function resolve(root, args) {
    return verifyAccount(args.token)
    .then(data => {
        if(data.status_code === 0 && data.isAdminOrStaff) {
            createNewBook(args);
        }
        else {
            return determineStatusMessage(data);
        }
    });
}

/**
 * Create a new entry to books table
 * @param {Object} args The details of the book that will be created
 */
function createNewBook(args) {
    return DB.models.books.create(new BookDetails(args))
    .then(bookQueryHandler);
}

/**
 * Determines what status code to send to the client/user
 * @param {Object} data The result of the verifyAccount Promise Object
 */
function determineStatusMessage(data) {
    if(data.status_code === 0 && !data.isAdminOrStaff) {
        // Send a message that the user doesn't have admin or staff privilege
        return STATUS_MSG["20"];
    }
    return STATUS_MSG[String(data)];
}

/**
 * Returns a proper response to the client
 * @param {Object} book The instance of book at the database
 */
function bookQueryHandler(book) {
    return new UserResponse(true, 0, {bookId: book.id});
}

export default resolve;