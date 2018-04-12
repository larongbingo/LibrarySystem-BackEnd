import {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import updateCountersResolver from "./resolvers/updateViewCounterResolver";

export default {
    type: GraphQLJSON,
    description: "Updates the counters for each books",
    args: {
        bookId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The id of the book that needs to be updated"
        }
    },
    resolve: updateCountersResolver
}