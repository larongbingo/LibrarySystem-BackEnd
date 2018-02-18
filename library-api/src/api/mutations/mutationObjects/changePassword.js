/**
 * changePassword.js
 * Handles all of the process in changing password
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
    description: "Change password",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token of the user that wants to change the password"
        },
        newPassword: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The new password for the account of the user"
        }
    },
    resolve(root, args) {
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
            if(err || !decoded) {
                return createResponse(false, 3, {reason: "Invalid Token"}); 
            }
            else {
                return DB.models.users.findOne({
                    where: {
                        id: decoded.userId
                    }
                })
                .then(user => {
                    return DB.models.sessions.findOne({
                        where: {
                            token: args.token
                        }
                    })
                    .then(session => {
                        if(!session) {
                            return createResponse(false, 4, {reason: "Token is expired"}); 
                        }

                        if(!user) {
                            return createResponse(false, 9, {reason: "User does not exist"});
                        }
    
                        if(user.id === decoded.userId) {
                            user.update({
                                password: args.newPassword
                            });
        
                            return DB.models.transactions.create({
                                transactionType: "CHANGE PASSWORD",
                                transactionRemarks: `user#${user.id} changed password`,
                                userId: user.id,
                                bookId: null
                            })
                            .then(transaction => {
                                return DB.models.session.findOne({
                                    where: {
                                        token: args.token
                                    }
                                })
                                .then(session => {
                                    session.destroy();

                                    return createResponse(true, 0, {    
                                        transactionType: transaction.transactionType,
                                        transactionRemarks: transaction.transactionRemarks
                                    });
                                })
                            });
                        }
                        else {
                            // user and requesting user ids is not the same
                            return createResponse(false, 10, {reason: "Error Occurred"});
                        }
                    })
                })
            }
        });
    }
}