/**
 * mutation.js
 * Holds all of the POST Request APIs
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