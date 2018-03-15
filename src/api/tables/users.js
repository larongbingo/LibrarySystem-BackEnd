/**
 * users.js
 * Holds all of the data that represents a user
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
    GraphQLObjectType,
    GraphQLList
} from "graphql";
import BooksObject from "./books";

export default new GraphQLObjectType({
    name: "User",
    description: "Holds the data of a user",
    fields: () => {
        return {
            id: {
                description: "The ID Number in the Database",
                type: GraphQLInt,
                resolve(user) {
                    return user.id;
                }
            },
            firstName: {
                description: "The first name of the user",
                type: GraphQLString,
                resolve(user) {
                    return user.firstName;
                }
            },
            lastName: {
                description: "The last name of the user",
                type: GraphQLString,
                resolve(user) {
                    return user.lastName;
                }
            },
            userID: {
                description: "The given ID of the user",
                type: GraphQLString,
                resolve(user) {
                    return user.userID;
                }
            },
            userType: {
                description: "The position or account type of the user",
                type: GraphQLString,
                resolve(user) {
                    return user.userType;
                }
            },
            books: {
                description: "The books borrowed by the user",
                type: new GraphQLList(BooksObject),
                resolve(user) {
                    user.getBooks();
                }
            }
        };
    }
});