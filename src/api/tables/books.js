/**
 * books.js
 * Represents the information of a book
 * 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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