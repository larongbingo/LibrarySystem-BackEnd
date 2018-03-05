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