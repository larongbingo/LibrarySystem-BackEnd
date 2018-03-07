/**
 * unreserveBook.js
 * Handles all requests that cancels a reservation of a book
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
import STATUS_MSG from "./helpers/statusCodes";
import verifyAccount from "./helpers/accountVerifier";

// TODO: Refactor

export default {
    type: GraphQLJSON,
    description: "Cancels a reservation",
    args: {
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The book id that has a reservation"
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the user that needs to cancel a reservation"
        }
    },
    resolve(root, args) {
        return verifyAccount(args.token)
        .then(data => {
            if(data.status_code === 0) {
                // Find the book
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {
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

                    // Update Book
                    book.update({
                        userId: null
                    });

                    // Find the corresponding counters for the current book
                    DB.models.bookViews.findOne({

                        where: {

                            id: book.id

                        }

                    })

                    .then(bookView => {

                        // Add one to the counter
                        bookView.update({

                            unreserves_count: bookView.unreserves_count + 1

                        });

                    });

                    // Create the transaction object
                    return DB.models.transactions.create({
                        transactionType: "UNRESERVE BOOK",
                        transactionRemarks: `user#${data.decoded.userId} cancels reservation to book#${args.bookId}`,
                        userId: data.decoded.userId,
                        bookId: args.bookId
                    })
                    .then(transaction => {
                        return createResponse(true, 0, {transactionId: transaction.id});
                    })
                })
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
}