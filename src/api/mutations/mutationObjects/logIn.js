/**
 * logIn.js
 * Handles all of the requests for authenticating users and sending JWTs
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