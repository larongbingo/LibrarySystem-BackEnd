/**
 * returnBook.js
 * Handles all of the requests that marks a book 'returned'
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
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import returnBookResolver from "./resolvers/returnBookResolver";

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
    resolve: returnBookResolver
}