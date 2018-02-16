/**
 * addBook.js
 * Handles all of the process in createing a new book to the DB
 */

import {
    GraphQLString,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";

export default {
    type: GraphQLJSON,
    description: "Adds a new book to the Database",
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The title of the book"
        },
        author: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The author of the book"
        },
        ISBN: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The ISBN of the book"
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the staff or admin that will add a new book"
        }
    },
    resolve(root, args) {
        // Check if token is valid
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {    
            if(err || !decoded) {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Invalid Token"
                }
            }

            // Check if the position is 'ADMINISTRATOR' or 'STAFF'
            if(decoded.position === "ADMINISTRATOR" || decoded.position === "STAFF") {
                // Check if the token is in Sessions Table
                return DB.models.sessions.findOne({
                    where: {
                        token: args.token
                    }
                })
                .then(session => {
                    if(session) {
                        // Store to DB the new book details
                        return DB.models.books.create({
                            title: args.title,
                            author: args.author,
                            ISBN: args.ISBN,
                            isBorrowed: false
                        })
                        .then((book) => {
                            // Return success
                            return {
                                success: true,
                                iat: Date.now(),
                                bookId: book.id
                            }
                        });
                    }
                    else {
                        return {
                            success: false,
                            iat: Date.now(),
                            reason: "Invalid Token"
                        }
                    }
                })
            }
            
            return {
                success: false,
                iat: Date.now(),
                reason: "Invalid Token, only ADMINS or STAFFS can add books"
            }
        });
    }
}