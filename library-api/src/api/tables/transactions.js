/**
 * transactions.js
 * Represents information and data of a transaction
 */

import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType
} from "graphql";

export default new GraphQLObjectType({
    name: "Transactions",
    description: "Returns the transactions of all users",
    fields: () => {
        return {
            id: {
                description: "The ID Number in the Database",
                type: GraphQLInt,
                resolve(transaction) {
                    return transaction.id;
                }
            },
            transactionType: {
                description: "The type or class of transaction",
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.transactionType;
                }
            },
            transactionRemark: {
                description: "The remark or comment of the transaction",
                type: GraphQLString,
                resolve(transaction) {
                    return transaction.transactionRemarks;
                }
            },
            userId: {
                description: "The ID of the user that was involved in the transaction",
                type: GraphQLInt,
                resolve(transaction) {
                    return transaction.userId;
                }
            },
            bookId: {
                description: "The ID of the book that was involved in the transaction",
                type: GraphQLInt,
                resolve(transaction) {
                    return transaction.bookId;
                }
            }
        };
    }
});