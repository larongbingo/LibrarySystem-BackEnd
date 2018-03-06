/**
 * mutation.js
 * Holds all of the POST Request APIs
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

import { GraphQLObjectType } from "graphql";
import LogInObject from "./mutationObjects/logIn";
import LogOutObject from "./mutationObjects/logOut";
import AddUserObject from "./mutationObjects/addUser";
import AddBookObject from "./mutationObjects/addBook";
import BorrowBookObject from "./mutationObjects/borrowBook";
import ReturnBookObject from "./mutationObjects/returnBook";
import ReserveBookObject from "./mutationObjects/reserveBook";
import UnreserveBookObject from "./mutationObjects/unreserveBook";
import ChangeAccountInfoObject from "./mutationObjects/changeAccountInfo";
import ChangeBookInfoObject from "./mutationObjects/changeBookInfo";

process.env.SECRET_KEY = "This is a test for the super secret key";

export default new GraphQLObjectType({
    name: "Mutations",
    description: "All of the function that requires the user to be logged in",
    fields() {
        return {
            logIn: LogInObject,
            logOut: LogOutObject,
            addUser: AddUserObject,
            addBook: AddBookObject,
            borrowBook: BorrowBookObject,
            returnBook: ReturnBookObject,
            reserveBook: ReserveBookObject,
            unreserveBook: UnreserveBookObject,
            changeAccountInfo: ChangeAccountInfoObject,
            changeBookInfo: ChangeBookInfoObject
        };
    }
});