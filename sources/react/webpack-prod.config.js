var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill', 
        './sources/react/App'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new webpack.DefinePlugin({
            '__DEVTOOLS__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    }
};
