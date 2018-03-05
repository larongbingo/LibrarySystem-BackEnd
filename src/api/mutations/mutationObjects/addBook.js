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
import createResponse from "./helpers/createResponse";
import STATUS_MSG from "./helpers/statusCodes";
import verifyAccount from "./helpers/accountVerifier";

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
        return verifyAccount(args.token)
        .then(data => {
            if(data.status_code === 0) {
                if(data.isAdminOrStaff) {
                    return DB.models.books.create({
                        title: args.title,
                        author: args.author,
                        ISBN: args.ISBN,
                        isBorrowed: false,
                        isActive: true
                    })
                    .then(book => {
                        return createResponse(true, 0, {bookId: book.id});
                    });
                }
                else {
                    // Send a message that user doesn't have admin or staff privilege
                    return STATUS_MSG["20"];
                }
            }
            else {
                return STATUS_MSG[String(data)];
            }
        });
    }
}