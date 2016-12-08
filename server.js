// CONSTANTS
const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
//Webpack middleware configuration 
// It's a simple wrapper middleware for webpack. 
// It serves the files emitted from webpack over a connect server.
// It has a few advantages over bundling it as files:

// No files are written to disk, it handle the files in memory
// If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling has finished.
// You don't have to wait before refreshing the page after a file modification.


const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require ('webpack-dev-middleware');
const webpackHotMiddleware = require ('webpack-hot-middleware');
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

// GENERAL MIDDLEWARE 
//Morgan
app.use(morgan('dev'));

//Static declaration for css files, js files, etc is in the client folder
app.use(express.static(path.join(__dirname, 'client')));

//Route to the index.html in the client folder
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, './client/index.html');
  res.sendFile(indexPath);
});


// server 
app.listen(PORT, (err) => {
  if (err) throw err;
});