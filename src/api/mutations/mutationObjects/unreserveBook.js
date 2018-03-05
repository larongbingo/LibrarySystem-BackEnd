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