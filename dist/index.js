"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./api/index.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import 'babel-polyfill';
// import socket from './socket'
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/api', _index["default"]);

var server = _http["default"].createServer(app);

_socket["default"].listen(server);

var port = process.env.PORT || 5050;
server.listen(port, function (err) {
  if (err) {
    console.log(err.message || err);
  }

  console.log("Running on port: ".concat(port));
});