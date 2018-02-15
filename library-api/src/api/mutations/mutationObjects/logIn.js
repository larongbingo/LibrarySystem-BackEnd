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
import { hashSync, compareSync } from "bcrypt-nodejs";
import JWT from "jsonwebtoken";

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
            let hash = JWT.sign({
                username: user.username,
                userId: user.id,
                position: user.userType
            }, process.env.SECRET_KEY);

            if(typeof user !== 'undefined' && user !== null && compareSync(args.password, user.password)) {
                DB.models.sessions.create({
                    token: hash
                });
                
                return {
                    success: true,
                    iat: Date.now(),
                    hash: hash
                }
                //return(`{loggedIn:true,hash:'${hashSync(user.username)}',id:${user.id},iat:${Date.now()}}`);
            }
            else {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Incorrect credentials"
                }
                //return(`{loggedIn:false,iat:${Date.now()}}`);
            }
        })
    }
}