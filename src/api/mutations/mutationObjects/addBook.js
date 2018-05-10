/**
 * addBook.js
 * Handles all of the process in createing a new book to the DB
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
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import addBookResolver from "./resolvers/addBookResolver";

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
    resolve: addBookResolver
};