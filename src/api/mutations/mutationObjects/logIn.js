/**
 * logIn.js
 * Handles all of the requests for authenticating users and sending JWTs
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
} from "graphql"
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import { hashSync, compareSync } from "bcryptjs";
import JWT from "jsonwebtoken";
import createResponse from "./helpers/createResponse";
import logInResolver from "./resolvers/logInResolver";

export default {
    type: GraphQLJSON,
    description: "Returns a string with token if the given credentials are valid",
    args: {
        username: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The username of the account"
        },
        password: { // TODO: Hash the password
            type: new GraphQLNonNull(GraphQLString),
            description: "The password of the account"
        }
    },
    resolve: logInResolver
}