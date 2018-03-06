/**
 * users.js
 * Handles all of the requests for user infos
 * 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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