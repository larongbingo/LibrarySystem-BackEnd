import {
    GraphQLString,
    GraphQLNonNull
} from "graphql"
import DB from "../../../db/dbMap";
import { hashSync, compareSync } from "bcrypt-nodejs";

export default {
    type: GraphQLString,
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
                return(`{loggedIn:true,hash:'${hashSync(user.username)}',id:${user.id},ita:${Date.now()}}`);
            }
            else {
                return(`{loggedIn:false,ita:${Date.now()}}`);
            }
        })
    }
}