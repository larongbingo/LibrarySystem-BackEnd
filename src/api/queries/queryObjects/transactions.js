/**
 * transactions.js
 * Handles all of the queries about the transaction
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
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import TransactionsObject from "../../tables/transactions";
import DB from "../../../db/dbMap";
import JWT from "jsonwebtoken";
import { Op } from "sequelize";
import STATUS_MSG from "../../mutations/mutationObjects/helpers/statusCodes";
import percentify from "./helpers/percentify";
import queryCreator from "./helpers/queryCreator";

const FIELDS = [
    ["id", Op.eq],
    ["transactionType", Op.like, percentify],
    ["userId", Op.eq],
    ["bookId", Op.eq]
];

export default {
    description: "Returns a list of transactions",
    type: new GraphQLList(TransactionsObject),
    args: {
        token: {
            description: "The token of the staff or admin",
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            description: "The ID in the Database",
            type: GraphQLInt
        },
        transactionType: {
            description: "The type or class of transaction",
            type: GraphQLString
        },
        userId: {
            description: "The ID of the user that was involved in the transaction",
            type: GraphQLInt
        },
        bookId: {
            description: "The ID of the book that was involved in the transaction",
            type: GraphQLInt
        }
    },
    resolve(root, args) {
        return JWT.verify(args.token, process.env.SECRET_KEY, (err, decoded) => {
            if(err || !decoded) {
                return [{transactionRemarks: JSON.stringify(STATUS_MSG["3"])}];
            }
            else {
                return DB.models.sessions.findOne({
                    where: {
                        token: args.token
                    }
                })
                .then(session => {
                    if(!session) {
                        return [{transactionRemarks: JSON.stringify(STATUS_MSG["4"])}];
                    }
                    else {
                        if(decoded.position === "ADMINISTRATOR" || decoded.position === "STAFF") {
                            let query = queryCreator(FIELDS, args);
                            return DB.models.transactions.findAll({where: query});
                        }
                        else {
                            return [{transactionRemarks: JSON.stringify(STATUS_MSG["5"])}];
                        }
                    }
                })
            }
        });
    }
}