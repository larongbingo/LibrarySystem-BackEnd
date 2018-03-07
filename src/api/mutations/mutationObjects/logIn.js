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
    resolve(root, args) {
        return DB.models.users.findOne({
            where: {
                username: args.username
            }
        })
        .then(user => {
            if(!user) {
                return createResponse(false, 9, {reason: "User does not exist"}); 
            }

            let hash = JWT.sign({
                username: user.username,
                userId: user.id,
                position: user.userType
            }, process.env.SECRET_KEY);

            if(compareSync(args.password, user.password)) {
                DB.models.sessions.create({
                    token: hash
                });
                
                return createResponse(true, 0, {token: hash});
            }
            else {
                return createResponse(false, 11, {reason: "Incorrect credentials"}); 
            }
        })
    }
}