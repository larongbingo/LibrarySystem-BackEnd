/**
 * borrowBook.js
 * Handles all of the process in marking a book 'borrowed'
 * 
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
 */

import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";
import createResponse from "./helpers/createResponse";
import verifyAccount from "./helpers/accountVerifier";
import STATUS_MSG from "./helpers/statusCodes";

export default {
    type: GraphQLJSON,
    description: "Marks a book borrowed",
    args: {
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The id of the user that wants to borrow a book"
        },
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The id if the book that the user wants to borrow"
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token for the API"
        },
        transactionRemark: {
            type: GraphQLString,
            description: "The remark or comment for the borrowing of the book"
        }
    },
    resolve(root, args) {
        return verifyAccount(args.token)
        .then(data => {
            if(data.status_code === 0) {
                
                // Check if the accoun is ADMIN or STAFF
                if(!data.isAdminOrStaff) {
                    return STATUS_MSG["8"];
                }

                // Query for the book
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {

                    // Check if the book exists in the database
                    if(!book) {
                        return STATUS_MSG["17"];
                    }

                    // Check if the book is not borrowed or reserved by anyone
                    else if(book.userId || book.isBorrowed) {
                        return STATUS_MSG["13"];
                    }

                    else {
                        // Update Book
                        book.update({
                            isBorrowed: true,
                            userId: args.userId
                        });

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

                        // Create transaction object
                        return DB.models.transactions.create({
                            transactionType: "BORROWING BOOK",
                            transactionRemarks: args.transactionRemark,
                            userId: args.userId,
                            bookId: args.bookId
                        })
                        .then(transaction => {
                            // Send a response to the user that marking book borrowed is complete
                            return createResponse(true, 0, {
                                transactionID: transaction.id,
                                transactionType: transaction.transactionType,
                                transactionRemarks: transaction.transactionRemarks
                            });
                        });
                    }
                });
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
}