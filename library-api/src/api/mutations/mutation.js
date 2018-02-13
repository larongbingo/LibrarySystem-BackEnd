/**
 * mutation.js
 * Holds all of the POST Request APIs
 */

import { GraphQLObjectType } from "graphql";
import LogInObject from "./mutationObjects/logIn";
import AddUserObject from "./mutationObjects/addUser";
import BorrowBookObject from "./mutationObjects/borrowBook";
import ReturnBookObject from "./mutationObjects/returnBook";
import ReserveBookObject from "./mutationObjects/reserveBook";
import UnreserveBookObject from "./mutationObjects/unreserveBook";
import ChangePasswordObject from "./mutationObjects/changePassword";
import ChangeUsernameObject from "./mutationObjects/changeUsername";

process.env.SECRET_KEY = "This is a test for the super secret key";

export default new GraphQLObjectType({
    name: "Mutations",
    description: "All of the function that requires the user to be logged in",
    fields() {
        return {
            logIn: LogInObject,
            addUser: AddUserObject,
            borrowBook: BorrowBookObject,
            returnBook: ReturnBookObject,
            reserveBook: ReserveBookObject,
            unreserveBook: UnreserveBookObject,
            changePassword: ChangePasswordObject,
            changeUsername: ChangeUsernameObject
        };
    }
});