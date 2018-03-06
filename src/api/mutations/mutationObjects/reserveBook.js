/**
 * reserveBook.js
 * Handles all of the requests for marking books 'reserved'
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
    description: "Marks a book reserved",
    args: {
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The id of the book the user wants to reserve"
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the user that wants to reserve"
        }
    },
    resolve(root, args) {
        return verifyAccount(args.token)
        .then(data => {
            if(data.status_code === 0) {
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {
                    // Check if the book does exist
                    if(!book) {
                        return STATUS_MSG["17"];
                    }

                    // Check if the book is not reserved or borrowed by anyone
                    if(book.userId || book.isBorrowed) {
                        return STATUS_MSG["13"];
                    }

                    // Update Book to reserved
                    book.update({
                        userId: data.decoded.userId
                    });

                    // Create a record to transactions table
                    return DB.models.transactions.create({
                        transactionType: "RESERVING BOOK",
                        transactionRemarks: `user#${data.decoded.userId} reserves book#${args.bookId}`,
                        bookId: args.bookId,
                        userId: data.decoded.userId
                    })
                    .then(transaction => {
                        return createResponse(true, 0, {
                            transaction: transaction.id
                        });
                    });
                });
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
};