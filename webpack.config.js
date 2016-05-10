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
                    presets: ['babel-preset-es2015', 'babel-preset-stage-0']
                }
            },
            {
                test: /\.html$/,
                loader: 'mustache'
            }
        ]
    }
};
