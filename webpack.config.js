const path = require("path");
const webpack = require("webpack");

// if NODE_ENV is null, turn the entire project as development
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
}

let defaultConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        "index": "./src/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: [
                    path.resolve(__dirname, "/node_modules"),
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "database": path.resolve(__dirname, "src/database"),
            "helpers": path.resolve(__dirname, "src/helpers"),
            "routes": path.resolve(__dirname, "src/routes"),
            "graphql": path.resolve(__dirname, "src/graphql"),
            "tests": path.resolve(__dirname, "src/tests")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.KEY": JSON.stringify("THIS IS A VERY SECRET PASSWORD!!")
        })
    ],
    target: "node",
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
    cache: true
}

let testingConfig = {
    mode: "development",
    entry: {
        "test": "./src/tests/tests.ts"
    },
    output: {
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: [
                    path.resolve(__dirname, "/node_modules"),
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "database": path.resolve(__dirname, "src/database"),
            "helpers": path.resolve(__dirname, "src/helpers"),
            "routes": path.resolve(__dirname, "src/routes"),
            "graphql": path.resolve(__dirname, "src/graphql"),
            "tests": path.resolve(__dirname, "src/tests")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("testing"),
            "process.env.KEY": JSON.stringify("THIS IS A VERY SECRET PASSWORD!!")
        })
    ],
    target: "node",
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
    cache: true,
    parallelism: 4,
    profile: true
}

// Add the following if the environment is for development
if(process.env.NODE_ENV === "development") {
    defaultConfig.entry["syncTables"] = "./src/scripts/syncTables.ts";
}

module.exports = [defaultConfig, testingConfig];