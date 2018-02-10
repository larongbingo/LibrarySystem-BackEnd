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
        password: {
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
            if(typeof user !== 'undefined' && user !== null && compareSync(args.password, user.password)) {
                return {
                    success: true,
                    ita: Date.now(),
                    hash: JWT.sign({
                        username: user.username,
                        id: user.id,
                        position: user.userType
                    }, process.env.SECRET_KEY)
                }
                //return(`{loggedIn:true,hash:'${hashSync(user.username)}',id:${user.id},ita:${Date.now()}}`);
            }
            else {
                return {
                    success: false,
                    ita: Date.now()
                }
                //return(`{loggedIn:false,ita:${Date.now()}}`);
            }
        })
    }
}