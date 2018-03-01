/**
 * books.js
 * Represents the information of a book
 */

import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLBoolean
} from "graphql";

export default new GraphQLObjectType({
    name: "Book",
    description: "Returns data about the books in the library",
    fields: () => {
        return {
            id: {
                description: "The ID Number in the Database",
                type: GraphQLString,
                resolve(book) {
                    return book.id;
                }
            },
            title: {
                description: "The title of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.title;
                }
            },
            author: {
                description: "The author of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.author;
                }
            },
            ISBN: {
                description: "The ISBN of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.ISBN;
                }
            },
            isBorrowed: {
                description: "Indicates whether the book has been borrowed by a user",
                type: GraphQLBoolean,
                resolve(book) {
                    return book.isBorrowed;
                }
            },
            userId: {
                description: "The user id that borrowed the book",
                type: GraphQLInt,
                resolve(book) {
                    return book.userId;
                }
            }
        };
    }
});