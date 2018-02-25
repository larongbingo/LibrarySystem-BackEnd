/**
 * transactions.js
 * Handles all of the queries about the transaction
 */

import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} from "graphql";
import TransactionsObject from "../../tables/transactions";
import DB from "../../../db/dbMap";
import { Op } from "sequelize";

function percentify(str) {
    return '%' + str + '%';
}

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
        let query = {}

        FIELDS.forEach(element => {
            if(args[element[0]]) {
                query[element[0]] = {
                    [element[1]]: (element[2]) ? (element[2])(args[element[0]]) : args[element[0]]
                }
            }
        });

        console.log(query);

        return DB.models.transactions.findAll({where: query});
    }
}