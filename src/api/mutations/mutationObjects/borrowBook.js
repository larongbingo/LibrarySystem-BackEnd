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
        return DB.models.books.findOne({
            where: {
                id: args.bookId
            }
        })
        .then(book => {
            return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
                if(err || !decoded) {
                    return createResponse(false, 3, {reason: "Invalid Token"});
                    // TODO: Refactor everything
                }
                else if(decoded.position === 'ADMINISTRATOR' || decoded.position === "STAFF") {
                    return DB.models.sessions.findOne({
                        where: {
                            token: args.token
                        }
                    })
                    .then(session => {
                        if(!session) {
                            return createResponse(false, 3, {reason: "Token is expired"});
                        }

                        if(book !== null && typeof book !== 'undefined' && !book.isBorrowed && book.userId === null) {
                            // Update the book
                            book.update({
                                isBorrowed: true,
                                userId: args.userId
                            });
            
                            // Create a transaction object to transactions table
                            return DB.models.transactions.create({
                                transactionType: "BORROWING BOOK",
                                transactionRemarks: args.transactionRemark,
                                userId: args.userId,
                                bookId: args.bookId
                            })
                            .then(transaction => {
                                return createResponse(true, 0, {
                                    transactionID: transaction.id,
                                    transactionType: transaction.transactionType,
                                    transactionRemarks: transaction.transactionRemarks
                                })
                            });
                        }
                        else {
                            return createResponse(false, 7, {reason: "Book is currently lended to someone"});
                        }
                    })
                }
                else {
                    return createResponse(false, 8, {reason: "The borrowing of a book needs to be validated by a STAFF or an ADMIN"}); 
                }
            })

        });
    }
}