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

export default {
    type: GraphQLString,
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
            description: "The account type or class"
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
                return DB.models.users.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    userID: args.userID,
                    userType: args.userType,
                    username: args.username,
                    password: args.password
                })
                .then((user) => {
                    return {
                        success: true,
                        iat: Date.now(),
                        userId: user.id           
                    }
                    //return `{addUserStatus:true,iat:${Date.now()},id:${user.id}}`;
                })
            }
            else {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Username already taken"
                }
                //return `{addUserStatus:false,iat:${Date.now()},reason:'username already taken'}`
            }
        })
    }
}