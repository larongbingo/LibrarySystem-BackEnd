import {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType
} from "graphql";

export default new GraphQLObjectType({
    name: "File",
    description: "The copy of the thesis",
    fields: () => {
        return {
            id:{
                description: "The ID Number in the Database",
                type: GraphQLInt,
                resolve(file) {
                    return file.id;
                }
            },
            thesis_title: {
                description: "The title of the dissertation",
                type: GraphQLString,
                resolve(file) {
                    return file.file_title;
                }
            },
            file_name: {
                description: "The name of the file",
                type: GraphQLString,
                resolve(file) {
                    return file.file_name;
                }
            },
            file_type: {
                description: "The MIME or type of the file",
                type: GraphQLString,
                resolve(file) {
                    return file.file_type;
                }
            },
            file_blob: {
                description: "The binary data of the dissertation",
                type: GraphQLString,
                resolve(file) {
                    return file.file_binaries;
                }
            }
        }
    }
});