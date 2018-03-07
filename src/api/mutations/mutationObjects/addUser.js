/**
 * addUser.js
 * Handles all of the process in creating a new account
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
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";
import createResponse from "./helpers/createResponse";
import verifyAccount from "./helpers/accountVerifier";
import STATUS_MSG from "./helpers/statusCodes";

export default {
    type: GraphQLJSON,
    description: "Registers a new account to the user using the given info and credentials",
    args: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The first name of the user"
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The last name of the user"
        },
        userID: {
            type: GraphQLString,
            description: "The id number of the user"
        },
        username: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The username of the account"
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The password of the account"
        },
        token: {
            type: GraphQLString,
            description: "Allows creation of staff accounts if the given token is valid"
        }
    },
    resolve(root, args) {
        // Check if it has a token
        if(args.token) {
            // Check if the token is valid
            return verifyAccount(args.token) 
            .then(data => {
                // Add a new staff account
                if(data.status_code === 0) {
                    if(data.decoded.position === "ADMINISTRATOR") {
                        return DB.models.users.create({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            userId: args.userId,
                            userType: "STAFF",
                            isActive: true,
                            username: args.username,
                            password: args.password
                        })
                        .then(userPromiseHandler)
                    }
                    else {
                        return DB.models.users.create({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            userId: args.userId,
                            userType: "USER",
                            isActive: true,
                            username: args.username,
                            password: args.password
                        })
                        .then(userPromiseHandler);
                    }
                }
                
                return DB.models.users.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    userId: args.userId,
                    userType: "USER",
                    isActive: true,
                    username: args.username,
                    password: args.password
                })
                .then(userPromiseHandler)
            });    
        }
        else {
            return DB.models.users.create({
                firstName: args.firstName,
                lastName: args.lastName,
                userId: args.userId,
                userType: "USER",
                isActive: true,
                username: args.username,
                password: args.password
            })
            .then(userPromiseHandler)
        }
    }
}

/**
 * TODO: Remove Repeating insert statements
 */

function userPromiseHandler(user) {
    return createResponse(true, 0, {userId: user.id});
}