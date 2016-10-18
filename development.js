var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require("body-parser");
var webpackConfig = require('./webpack.dev.conf')
var http = require('http');
var cookieParser = require('cookie-parser')
var querystring = require('querystring');
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
      console.log(pathname.path);
      return pathname.path
  }
}));
// var base = "172.20.8.109"
// app.post("*", function(req, res) {
//   var pathname = url.parse(req.url);
//   var API = pathname.path;
//   //json转换为字符串
//   var data = querystring.stringify(req.body);
//   console.log(req.method);
//   var options = {
//       host: base,
//       port: 80,
//       path:"/v1/api" + API,
//       method: req.method,
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Content-Length': Buffer.byteLength(data)
//       }
//   };
//   var reqs = http.request(options, function(resq) {
//       resq.setEncoding('utf8');
//       var d = ""
//       resq.on('data', function (chunk) {
//           d= chunk;
//       });
//       resq.on('end',function(){
//           console.log(d);
//           res.json(JSON.parse(d));
//       })
//   });
//   reqs.write(data);
//   reqs.end();
//   // console.log();
// })
// app.get("*", function(req, res) {
//   console.log(req.cookies);
//   var pathname = url.parse(req.url);
//   var API = pathname.path;
//   var options = {
//         host: base, // 这个不用说了, 请求地址
//         port:80,
//         path:"/v1/api" + API, // 具体路径, 必须以'/'开头, 是相对于host而言的
//         method: req.method, // 请求方式, 这里以post为例
//         headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
//             'Content-Type': 'application/json',
//             'Cookie': "token=" + req.cookies.token,
//         }
//   };
//   http.get(options, function(resp) {
//         var resData = "";
//         resp.on("data",function(data){
//             resData += data;
//         });
//         resp.on("end", function() {
//             console.log(resData);
//             res.json(resData);
//         });
//   })
// })

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
