/**
 * transactions.js
 * Represents information and data of a transaction
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
    GraphQLObjectType
} from "graphql";

export default new GraphQLObjectType({
    name: "Transaction",
    description: "Holds the transaction of a users",
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