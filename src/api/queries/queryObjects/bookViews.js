import {
    GraphQLList,
    GraphQLInt
} from "graphql";
import BookViewsObject from "../../tables/bookView";
import DB from "../../../db/dbMap";

export default {
    description: "Returns a list of counters for all books",
    type: new GraphQLList(BookViewsObject),
    args: {
        id: {
            description: "The ID of the book",
            type: GraphQLInt
        }
    },
    resolve(root, args) {
        return DB.models.bookViews.findAll({
            where: args
        });
    }
}