/**
 * changeBookInfo.js
 * Handles all of the info changes required in a book
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

const ARG_FIELDS = [
    ["newTitle", "title"],
    ["newAuthor", "author"],
    ["newISBN", "ISBN"],
    ["newStatus", "isActive"]
];

export default {
    type: GraphQLJSON,
    description: "The function that handles all of the required changes in a book in the db",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the admin or staff that wants to change the details of a book"
        },
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The id of the book that you want to change or edit infos"
        },
        newTitle: {
            type: GraphQLString,
            description: "The new title for the book"
        },
        newAuthor: {
            type: GraphQLString,
            description: "The new author for the book" 
        },
        newISBN: {
            type: GraphQLString,
            description: "The new ISBN for the book"
        },
        newStatus: {
            type: GraphQLString,
            description: "The new status for the book; the status determines whether the book is still available for borrowing or not"
        }
    },
    resolve: (root, args) => {
        let updatedFields = "";

        return verifyAccount(args.token)
        .then(data => {
            if(data.status_code === 0) {
                if(data.isAdminOrStaff) {
                    // Reset the log of changed fields
                    updatedFields = "";

                    ARG_FIELDS.forEach((element) => {

                        // Check all of the non null fields in the args
                        if (args[element[0]]) {
                            updatedFields += element[0] + ", ";

                            // Update all of the values
                            DB.models.books.update(
                                JSON.parse(`{"${element[1]}": "${args[element[0]]}"}`), {
                                    where: {
                                        id: args.bookId
                                    }
                                }, {
                                    individualHooks: true
                                }
                            )
                            .then(() => {});
                        }
                    });

                    // Store to DB the changed fields
                    return DB.models.transactions.create({
                        transactionType: "CHANGE ACCOUNT INFO",
                        transactionRemarks: "Changed the following details: " + updatedFields,
                        bookId: args.bookId
                    })
                    .then(transaction => {
                        return createResponse(true, 0, {
                            updatedFields: updatedFields
                        });
                    })
                } 
                else {
                    return STATUS_MSG["21"];
                }
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
};