/**
 * changeAccountInfo.js
 * Handles all of the changes in an account
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
import changeAccountInfoResolver from "./resolvers/changeAccountInfoResolver";

const ARG_FIELDS = [
    ["newFirstName", "firstName"],
    ["newLastName", "lastName"],
    ["newUserID", "userID"],
    ["newUsername", "username"],
    ["newPassword", "password"]
];
let updatedFields = "";

export default {
    type: GraphQLJSON,
    description: "Change the info on your account",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the user that wants to change info"
        },
        newFirstName: {
            type: GraphQLString,
            description: "The new first name of the account"
        },
        newLastName: {
            type: GraphQLString,
            description: "The new last name of the account"
        },
        newUserID: {
            type: GraphQLString,
            description: "The new User ID of the account"
        },
        newUsername: {
            type: GraphQLString,
            description: "The new username of the account"
        },
        newPassword: {
            type: GraphQLString,
            description: "The new password of the account"
        }
    },
    resolve: changeAccountInfoResolver
}