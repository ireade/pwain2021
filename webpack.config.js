const path = require('path');

module.exports = {
    entry: './sw-src.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'sw.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
