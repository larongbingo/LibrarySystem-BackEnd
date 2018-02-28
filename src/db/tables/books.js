/**
 * books.js
 * Defines the table that represents and stores all books
 */

import { STRING, BOOLEAN } from "sequelize";
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
    },
    isBorrowed: {
        type: BOOLEAN,
        allowNull: true
    },
    isActive: {
        type: BOOLEAN,
        allowNull: false
    }
},
{
    hooks: {
        beforeCreate: (book, option) => {
            book.isActive = true;
        }
    }
});