import { GraphQLObjectType } from "graphql";
import UsersQueryObject from "./queryObjects/users";
import BooksQueryObject from "./queryObjects/books";

export default new GraphQLObjectType({
    name: "Queries",
    description: "Returns all data that doesn't need processing or auth",
    fields: () => {
        return {
            Users: UsersQueryObject,
            Books: BooksQueryObject
        };
    }
});