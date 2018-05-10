import {
    GraphQLInt,
    GraphQLObjectType
} from "graphql";

export default new GraphQLObjectType({
    name: "BookView",
    description: "The statistics of a book",
    fields() {
        return {
            id: {
                description: "The ID Number in the database",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.id;
                }
            },
            views_count: {
                description: "The total amount of visits in a book",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.views_count;
                }
            },
            borrows_count: {
                description: "The total amount of borrows",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.borrows_count;
                }
            },
            returns_count: {
                description: "The total amount of returns",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.returns_count;
                }
            },
            reserves_count: {
                description: "The total amount of reserves",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.reserves_count;
                }
            },
            unreserves_count: {
                description: "The total amount of unreserves",
                type: GraphQLInt,
                resolve(bookView) {
                    return bookView.unreserves_count;
                }
            }
        }
    }
});