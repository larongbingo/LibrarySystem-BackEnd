import { GraphQLObjectType } from "graphql";
import UsersQueryObject from "./queryObjects/users";
import BooksQueryObject from "./queryObjects/books";
import TransactionsQueryObject from "./queryObjects/transactions";

export default new GraphQLObjectType({
    name: "Queries",
    description: "Returns all data that doesn't need processing or auth",
    fields: () => {
        return {
            Users: UsersQueryObject,
            Books: BooksQueryObject,
            Transactions: TransactionsQueryObject
        };
    }
});