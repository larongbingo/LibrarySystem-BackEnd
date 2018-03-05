/**
 * borrowBook.js
 * Handles all of the process in marking a book 'borrowed'
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