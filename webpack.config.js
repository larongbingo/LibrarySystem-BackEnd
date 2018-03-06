/** 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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