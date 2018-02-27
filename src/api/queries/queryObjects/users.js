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
import { Op } from "sequelize";

function percentify(str) {
    return '%' + str + '%';
}

const FIELDS = [
    ["id", Op.eq],
    ["userId", Op.eq],
    ["firstName", Op.like, percentify],
    ["lastName", Op.like, percentify],
    ["userType", Op.like, percentify]
]

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
        let query = {}

        FIELDS.forEach(element => {
            if(args[element[0]]) {
                query[element[0]] = {
                    [element[1]]: (element[2]) ? (element[2])(args[element[0]]) : args[element[0]]
                }
            }
        });

        console.log(query);

        return DB.models.users.findAll({where: query});
    }
}