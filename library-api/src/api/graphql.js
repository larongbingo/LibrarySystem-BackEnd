import { GraphQLSchema } from "graphql";
import Queries from "./queries/query";
import Mutations from "./mutations/mutation";

export default new GraphQLSchema({
    query: Queries,
    mutation: Mutations
});