/**
 * unreserveBook.js
 * Handles all requests that cancels a reservation of a book
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
import unreserveBookResolver from "./resolvers/unreserveBookResolver";

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
    resolve: unreserveBookResolver
}