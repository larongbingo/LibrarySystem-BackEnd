import { GraphQLObjectType } from "graphql";
import LogInObject from "./mutationObjects/logIn";
import AddUserObject from "./mutationObjects/addUser";
import BorrowBookObject from "./mutationObjects/borrowBook";
import ReserveBookObject from "./mutationObjects/reserveBook";

process.env.SECRET_KEY = "This is a test for the super secret key";

export default new GraphQLObjectType({
    name: "Mutations",
    description: "All of the function that requires the user to be logged in",
    fields() {
        return {
            logIn: LogInObject,
            addUser: AddUserObject,
            borrowBook: BorrowBookObject,
            reserveBook: ReserveBookObject
        };
    }
});