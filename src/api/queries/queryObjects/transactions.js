/**
 * transactions.js
 * Handles all of the queries about the transaction
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
        let query = {}

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
                        else {
                            return [{transactionRemarks: JSON.stringify(STATUS_MSG["5"])}];
                        }
                    }
                })
            }
        });
    }
}