/**
 * returnBook.js
 * Handles all of the requests that marks a book 'returned'
 */

import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";

export default {
    type: GraphQLJSON,
    description: "Marks a book returned",
    args: {
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The user that wants to return a book"
        },
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The book the user wants to return"
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The staff token that will verify the return"
        },
        transactionRemark: {
            type: GraphQLString,
            description: "Comments or remark about the book and/or user"
        }
    },
    resolve(root, args) {
        // TODO: Refactor
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
            if(err || !decoded) {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Invalid Token"
                }
            }
            else if(decoded.position == "ADMINISTRATOR" || decoded.position == "STAFF") {
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {
                    let sameUserID = book.userId === args.userId;
                    
                    if(sameUserID && book.isBorrowed) {
                        book.update({
                            isBorrowed: false,
                            userId: null
                        });

                        return DB.models.transactions.create({
                            transactionType: "RETURNING BOOK",
                            transactionRemarks: args.transactionRemark,
                            userId: args.userId,
                            bookId: args.bookId
                        })
                        .then((transaction) => {
                            return {
                                success: true,
                                transactionID: transaction.id,
                                transactionType: transaction.transactionType,
                                transactionRemarks: transaction.transactionRemarks,
                                iat: Date.now()
                            }
                        })
                    }
                    else {                   
                        return {
                            success: false,
                            iat: Date.now(),
                            reason: ((!sameUserID) ? "The book is not borrowed by the requesting user. " : "The book is not yet borrowed, or its currently reserved") 
                        }
                    }
                })
            }
            else {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "The returning of a book needs to be validated by a STAFF or an ADMIN"
                }
            }
        });
    }
}