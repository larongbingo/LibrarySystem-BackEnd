/**
 * books.js
 * Handles all the request for data about books
 */

import { 
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import { Op } from "sequelize";
import BooksObject from "../../tables/books";
import DB from "../../../db/dbMap";

function percentify(str) {
    return '%' + str + '%';
}

const FIELDS = [
    ["id", Op.eq],
    ["title", Op.like, percentify],
    ["author", Op.like, percentify],
    ["ISBN", Op.like, percentify],
    ["isBorrowed", Op.eq],
    ["userId", Op.eq]
];

export default {
    description: "Returns a list of books",
    type: new GraphQLList(BooksObject),
    args: {
        id: {
            description: "The ID in the Database",
            type: GraphQLInt
        },
        title: {
            description: "The title of the book",
            type: GraphQLString
        },
        author: {
            description: "The author of the book",
            type: GraphQLString
        },
        ISBN: {
            description: "The ISBN of the book",
            type: GraphQLString
        },
        isBorrowed: {
            description: "Indicates if the book has been borrowed by a user",
            type: GraphQLBoolean
        },
        userId: {
            description: "The id of the user that is currently borrowing/holds the book",
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

        return DB.models.books.findAll({
            where: query
        });
    }
}