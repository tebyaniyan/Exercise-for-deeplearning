const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const exercises = getDirectories('./exercises');

const index = exercises.length - 1;
const lastExercise = exercises[index].split('\\')[1];

module.exports = {
    devtool: 'inline-source-map',
    entry: './exercises/' + lastExercise + '/index.js',
    watch: true,
    output: {
        filename: './public/' + lastExercise + '.js',
        sourceMapFilename: './public/' + lastExercise + '.js.map'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.sass$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
        }]
    }
};
