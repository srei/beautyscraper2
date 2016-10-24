var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
// var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: './client/index.jsx',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
 module: {
   loaders: [
     { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'client') },
   ],
 },
  plugins: [
   // Automatically generate our html page
   new HtmlWebpackPlugin({
     // Define the starting point for our dynamic html creation
     template: path.join(__dirname, '/index.html'),
     appMountId: 'root',
     title: 'Hello',
   }),
 ]
};

module.exports = config;


/*
 webpack - needs the entry file. Where does it start building the key of dependencies.
	output key - has a value of an obj, of more configurations; (a) where do you ouput this file to?, the value of PATH sets the location of where you WANT to put it. Webpack creates it dynamically for you
	filename key - is set to whatever you want to call it.

	THEN - you need a loader --> what should it transpile your code with. In this case, you want to transpile w/ BABEL
				- every value in array has to have a TEST (the file extension) and the LOADER tells it to load it w/ whatever you put in it.


HTML webpack --> every change creates a new hashname that will
 */