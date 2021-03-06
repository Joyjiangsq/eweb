var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require("body-parser");
var webpackConfig = require('./webpack.dev.conf')
var http = require('http');
var cookieParser = require('cookie-parser')
var querystring = require('querystring');
var colors = require('colors');
var url = require('url');
// default port where dev server listens for incoming traffic
var port = 8080
var proxy = require('express-http-proxy');

var app = express()
var compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: "/"
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
// app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', proxy('172.20.8.109', {
  forwardPath: function(req, res) {
      var pathname = url.parse(req.url);
      console.log("[".green +req.method.green+"]".green + "----" + pathname.pathname.green);
      console.log("======================================".gray);
      return pathname.path
  }
}));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
