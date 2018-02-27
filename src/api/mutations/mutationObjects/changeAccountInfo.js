import {
    GraphQLString,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";
import createResponse from "./helpers/createResponse";
import STATUS_MSG from "./helpers/statusCodes";

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
    resolve(root, args) {
        return JWT.verify(args.token, process.env.SECRET_KEY, (err, decoded) => {
            // Check if the token is valid
            if(err || !decoded) {
                return STATUS_MSG["3"];
            }
            else {
                return DB.models.sessions.findOne({
                    where: {
                        token: args.token
                    }
                })
                .then(session => {
                    // Check if the token has a valid session
                    if(!session) {
                        return STATUS_MSG["4"];
                    }
                    else {
                        // Reset the log of changed fields
                        updatedFields = "";

                        ARG_FIELDS.forEach((element) => {
                            // Check all of the non null fields in the args
                            if(args[element[0]]) {
                                updatedFields += element[0] + ", ";

                                console.log(`{"${element[1]}": "${args[element[0]]}"}`);

                                // Update all of the values
                                DB.models.users.update(
                                    JSON.parse(`{"${element[1]}": "${args[element[0]]}"}`), 
                                    {
                                        where:{
                                            id: decoded.userId
                                        }
                                    },
                                    {individualHooks: true}
                                )
                                .then(() => {});
                            }
                        })

                        // Store to DB the changed fields
                        DB.models.transactions.create({
                            transactionType: "CHANGE ACCOUNT INFO",
                            transactionRemarks: "Changed the following details: " + updatedFields,
                            userId: decoded.userId
                        })
                        
                        // Delete current token of user from sessions
                        DB.models.sessions.destroy({
                            where: {
                                token: args.token
                            }
                        })

                        // Send to client of the result
                        return createResponse(true, 0, {
                            updatedFields: updatedFields
                        })
                    }
                })
            }
        })
    }
}