/**
 * books.js
 * Defines the table that represents and stores all books
 */

import { STRING } from "sequelize";
import DB from "../dbConn";

export default DB.define("books", {
    title: {
        type: STRING,
        allowNull: false
    },
    author: {
        type: STRING,
        allowNull: false
    },
    ISBN: {
        type: STRING,
        allowNull: false
    }
});