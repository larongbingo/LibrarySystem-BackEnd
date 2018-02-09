import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} from "graphql";
import BooksObject from "./books";

export default new GraphQLObjectType({
    name: "Users",
    description: "Returns data the user/s",
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