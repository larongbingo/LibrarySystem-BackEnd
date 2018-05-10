/**
 * logOut.js
 * Handles all of the requests for removing the token in the sessions
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
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import logOutResolver from "./resolvers/logOutResolver";

export default {
    type: GraphQLJSON,
    description: "Removes the session of the user in the APIs Session Holder",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token that will be used to log out the user and delete a session"
        }
    },
    resolve: logOutResolver
}