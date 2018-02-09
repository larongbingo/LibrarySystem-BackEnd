import { GraphQLSchema } from "graphql";
import Queries from "./queries/query";

export default new GraphQLSchema({
    query: Queries
});