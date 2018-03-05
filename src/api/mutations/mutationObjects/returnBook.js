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
import createResponse from "./helpers/createResponse";
import verifyAccount from "./helpers/accountVerifier";
import STATUS_MSG from "./helpers/statusCodes";

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
        return verifyAccount(args.token)
        .then(data => {

            if(data.status_code === 0) {

                // Find and update the book
                return DB.models.books.findOne({
                    where: {
                        id: args.bookId
                    }
                })
                .then(book => {
                    // Check if the userId in the book is the same as the requesting account
                    if(!(book.userId === args.userId)) {
                        return STATUS_MSG["14"];
                    }

                    // Check if the book is borrowed
                    if(!book.isBorrowed) {
                        return STATUS_MSG["15"];
                    }

                    book.update({
                        isBorrowed: false,
                        userId: null
                    });

                     // Create the transaction object
                    return DB.models.transactions.create({
                        transactionType: "RETURNING BOOK",
                        transactionRemarks: args.transactionRemark,
                        userId: args.userId,
                        bookId: args.bookId
                    })
                    .then(transaction => {
                        // Send response to user
                        return createResponse(true, 0, {
                            transactionID: transaction.id,
                            transactionType: transaction.transactionType,
                            transactionRemarks: transaction.transactionRemarks
                        });
                    });
                });
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
}