module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.html$/,
                loader: 'mustache'
            }
        ]
    }
};
