var path = require("path");
var webpack = require('webpack');

module.exports = {
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
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    target: "node",
    cache: true,
    stats: "verbose", 
    devtool: "source-map",
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
}