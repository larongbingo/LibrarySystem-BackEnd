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
        // TODO: Refactor, code too long
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
            
            // Check if theres no error during decryption
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
                    // Check if the book isn't reserved or borrowed by anyone
                    if(book.userId === null) {
                        book.update({
                            userId: decoded.userId
                        });

                        return DB.models.transactions.create({
                            transactionType: "RESERVING BOOK",
                            transactionRemarks: `user#${decoded.userId} reserves book#${args.bookId}`,
                            bookId: args.bookId,
                            userId: decoded.userId
                        })
                        .then((transaction) => {
                            return {
                                success: true,
                                iat: Date.now(),
                                transactionId: transaction.id
                            }
                        })
                    } 
                    else {
                        return {
                            success: false,
                            iat: Date.now(),
                            reason: "Book is borrowed or reserved by somebody"
                        }
                    }
                })
                .catch(err => {
                    return {
                        success: false,
                        iat: Date.now(),
                        reason: "Error Occurred"
                    }
                })
            }
        });
    }
};