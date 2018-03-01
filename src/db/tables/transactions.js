/**
 * transactions.js
 * Defines the table that represents all transactions for each 
 * books
 * 
 * Columns: 
 * transactionType - The name of the API that was called on the request
 * transactionRemarks - Comments or remark during the API call
 * userId - The id of the user that called the API
 * bookId - The id of the book that was involved in the transaction
 */

import { STRING } from "sequelize";
import DB from "../dbConn";

export default DB.define("transactions", {
    transactionType: {
        type: STRING,
        allowNull: false
    },
    transactionRemarks: {
        type: STRING,
        allowNull: true
    }
});