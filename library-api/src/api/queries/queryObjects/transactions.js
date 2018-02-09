import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} from "graphql";
import TransactionsObject from "../../tables/transactions";
import DB from "../../../db/dbMap";   

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
        return DB.models.transactions.findAll({where: args});
    }
}