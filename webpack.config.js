var path = require("path");
var webpack = require('webpack');

module.exports = [
    // Server
    {
        name: "API Server",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "index.js"
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            ["es2015", {"modules": false}]
                        ]
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
           /* new webpack.optimize.UglifyJsPlugin({
                parallel: {
                    cache: true,
                    workers: true
                },
                cache: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 5,
                    compress: true,
                    mangle: true
                }
            }),*/
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "process.env.DB_HOSTNAME": JSON.stringify(process.env.DB_HOSTNAME),
                "process.env.DB_PORT": JSON.stringify(process.env.DB_PORT),
                "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
                "process.env.DB_USERNAME": JSON.stringify(process.env.DB_USERNAME)
            })
        ],
        target: "node",
        cache: true,
        stats: "verbose", 
        devtool: "source-map",
        externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
    },

    // Sync DB
    {
        name: "syncDB",
        entry: "./src/lib/syncDB.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "syncDB.js"
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            ["es2015", {"modules": false}]
                        ]
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
           /* new webpack.optimize.UglifyJsPlugin({
                parallel: {
                    cache: true,
                    workers: true
                },
                cache: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 5,
                    compress: true,
                    mangle: true
                }
            }),*/
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "process.env.DB_HOSTNAME": JSON.stringify(process.env.DB_HOSTNAME),
                "process.env.DB_PORT": JSON.stringify(process.env.DB_PORT),
                "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
                "process.env.DB_USERNAME": JSON.stringify(process.env.DB_USERNAME)
            })
        ],
        target: "node",
        cache: true,
        stats: "verbose", 
        devtool: "source-map",
        externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
    },

    // Generate Random Data
    {
        name: "dbRand",
        entry: "./src/lib/genRandData.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "genRandData.js"
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            ["es2015", {"modules": false}]
                        ]
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
           /* new webpack.optimize.UglifyJsPlugin({
                parallel: {
                    cache: true,
                    workers: true
                },
                cache: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 5,
                    compress: true,
                    mangle: true
                }
            }),*/
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "process.env.DB_HOSTNAME": JSON.stringify(process.env.DB_HOSTNAME),
                "process.env.DB_PORT": JSON.stringify(process.env.DB_PORT),
                "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
                "process.env.DB_USERNAME": JSON.stringify(process.env.DB_USERNAME)
            })
        ],
        target: "node",
        cache: true,
        stats: "verbose", 
        devtool: "source-map",
        externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
    }
]