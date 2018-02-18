/**
 * users.js
 * Handles all of the requests for user infos
 */

import { 
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from "graphql";
import UsersObject from "../../tables/users";
import DB from "../../../db/dbMap";

export default {
    description: "Returns a list of users",
    type: new GraphQLList(UsersObject),
    args: {
        id: {
            description: "The ID in the Database",
            type: GraphQLInt
        },
        userID: {
            description: "The ID of the user", 
            type: GraphQLString
        },
        firstName: {
            description: "The first name of the user",
            type: GraphQLString
        },
        lastName: {
            description: "The last name of the user",
            type: GraphQLString
        },
        userType: {
            description: "The type of user",
            type: GraphQLString
        }
    },
    resolve(root, args) {
        return DB.models.users.findAll({where: args});
    }
}