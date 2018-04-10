import { 
    GraphQLString, 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import FileObject from "../../tables/file";
import DB from "../../../db/dbMap";
import { Op } from "sequelize";
import percentify from "./helpers/percentify";
import queryCreator from "./helpers/queryCreator";

const FIELDS = [
    ["id", Op.eq],
    ["file_title", Op.like, percentify]
]

export default {
    description: "Returns a list of thesis or dissertations",
    type: new GraphQLList(FileObject),
    args: {
        id: {
            description: "The ID in the database",
            type: GraphQLInt
        },
        file_title: {
            description: "The title of the dissertation",
            type: GraphQLString
        }
    },
    resolve(root, args) {
        let query = queryCreator(FIELDS, args);
        return DB.models.files.findAll({ where: args  });
    }
}