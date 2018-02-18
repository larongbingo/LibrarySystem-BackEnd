/**
 * transactions.js
 * Defines the table that represents all transactions for each 
 * books
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