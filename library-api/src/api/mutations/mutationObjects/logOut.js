import {
    GraphQLString,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";

export default {
    type: GraphQLJSON,
    description: "Removes the session of the user in the APIs Session Holder",
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The token that will be used to log out the user and delete a session"
        }
    },
    resolve(root, args) {
        return JWT.verify(args.token, process.env.SECRET_KEY, null, (err, decoded) => {
            if(err || !decoded) {
                return {
                    success: false,
                    iat: Date.now(),
                    reason: "Invalid Token"
                }
            }
            else {
                return DB.models.sessions.findOne({
                    where: {
                        token: args.token
                    }
                })
                .then(session => {
                    if(!session) {
                        return {
                            success: false,
                            iat: Date.now(),
                            reason: "No such user exists"
                        }
                    }

                    return session.destroy()
                    .then(() => {
                        return {
                            success: true,
                            iat: Date.now()
                        }
                    });
                })
            }
        });
    }
}