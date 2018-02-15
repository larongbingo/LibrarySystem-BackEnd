/**
 * unreserveBook.js
 * Handles all requests that cancels a reservation of a book
 */

import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";

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
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
            if(err || !decoded) {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Invalid Token"
                }
            }
            else {
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {
                    return DB.models.sessions.findOne({
                        where: {
                            token: args.token
                        }
                    })
                    .then(session => {
                        if(!session) {
                            return {
                                success: false,
                                iat: Date.now(),
                                reason: "Token is expired"
                            }
                        }
                        else {
                            if(typeof book === 'undefined' || book === null) {
                                return {
                                    success: false,
                                    iat: Date.now(),
                                    reason: "Book does not exist"
                                }
                            }
                            else if(book.userId === null && book.userId !== decoded.userId) {
                                return {
                                    success: false,
                                    iat: Date.now(),
                                    reason: "Book is not reserved to the user"
                                }
                            }
                            else {
                                book.update({
                                    userId: null
                                });
        
                                return DB.models.transactions.create({
                                    transactionType: "UNRESERVE BOOK",
                                    transactionRemarks: `user#${decoded.userId} cancels reservation to book#${args.bookId}`,
                                    userId: decoded.userId,
                                    bookId: args.bookId
                                })
                                .then(transaction => {
                                    return {
                                        success: true,
                                        iat: Date.now(),
                                        transactionID: transaction.id 
                                    }
                                })
                            }
                        }
                    })
                })
                .catch(err => {
                    return {
                        success: false,
                        iat: Date.now(),
                        reason: "Error occurred"
                    }
                })
            }
        });
    }
}