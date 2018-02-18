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
import createResponse from "./helpers/createResponse";

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
                return createResponse(false, 3, {reason: "Invalid Token"});
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
                            return createResponse(false, 4, {reason: "Token is expired"}); 
                        }
                        else {
                            if(typeof book === 'undefined' || book === null) {
                                return createResponse(false, 17, {reason: "Book does not exist"});
                            }
                            else if(book.userId === null && book.userId !== decoded.userId) {
                                return createResponse(false, 18, {reason: "Book is not reserved to the user"}); 
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
                                    return createResponse(true, 0, {transactionId: transaction.id});
                                })
                            }
                        }
                    })
                })
                .catch(err => {
                    return createResponse(false, 1, {reason: "Error occurred"}); 
                })
            }
        });
    }
}