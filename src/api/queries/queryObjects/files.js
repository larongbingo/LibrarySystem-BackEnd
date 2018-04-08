import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import FileObject from "../../tables/file";
import DB from "../../../db/dbMap";

export default {
    description: "Returns a list of thesis or dissertations",
    type: new GraphQLList(FileObject),
    args: {
        id: {
            description: "The ID in the database",
            type: GraphQLInt
        },
        thesis_title: {
            description: "The title of the dissertation",
            type: GraphQLString
        }
    },
    resolve(root, args) {
        return DB.models.files.create({ where: { args } });
    }
}