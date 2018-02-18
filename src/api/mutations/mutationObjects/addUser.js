/**
 * addUser.js
 * Handles all of the process in creating a new account
 */

import {
    GraphQLString,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";
import createResponse from "./helpers/createResponse";

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
        userType: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The account type or class",
            depracationReason: "Instead of marking each user a userType, the API will simply check if the token is an ADMIN or a STAFF"
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
        return DB.models.users.find({
            where: {
                username: args.username
            }
        })
        .then(user => {
            if(user === null || typeof user === 'undefined') {
                return DB.models.sessions.findOne({
                    where: {
                        token: args.token
                    }
                })
                .then(session => {
                    if(!session) {
                        return DB.models.users.create({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            userID: args.userID,
                            userType: "USER",
                            username: args.username,
                            password: args.password
                        })
                        .then((user) => {
                            return createResponse(true, 0, {userId: user.id});
                        })
                    }
                    else {
                        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
                            if(err || !decoded) {
                                return DB.models.users.create({
                                    firstName: args.firstName,
                                    lastName: args.lastName,
                                    userID: args.userID,
                                    userType: "USER",
                                    username: args.username,
                                    password: args.password
                                })
                                .then((user) => {
                                    return createResponse(true, 0, {userId: user.id});
                                })
                            }
                            
                            return DB.models.users.create({
                                firstName: args.firstName,
                                lastName: args.lastName,
                                userID: args.userID,
                                userType: "STAFF",
                                username: args.username,
                                password: args.password
                            })
                            .then((user) => {
                                return createResponse(true, 0, {userId: user.id});
                            })
                        })
                    }

                })
            }
            else {
                return createResponse(false, 6, {reason: "username already taken"}); 
            }
        })
    }
}