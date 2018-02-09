import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType
} from "graphql";

export default new GraphQLObjectType({
    name: "Books",
    description: "Returns data about the books in the library",
    fields: () => {
        return {
            id: {
                description: "The ID Number in the Database",
                type: GraphQLString,
                resolve(book) {
                    return book.id;
                }
            },
            title: {
                description: "The title of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.title;
                }
            },
            author: {
                description: "The author of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.author;
                }
            },
            ISBN: {
                description: "The ISBN of the book",
                type: GraphQLString,
                resolve(book) {
                    return book.ISBN;
                }
            }
        };
    }
});