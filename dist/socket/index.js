"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = socket;

var _socketFunctions = require("./socketFunctions");

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function socket(io) {
  var users = {};
  return io.on('connection', function (socket) {
    var userEmail;
    socket.on('connected', function (email) {
      users[email] = socket._id;
      userEmail = email;
    });
    socket.on('send-message', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return createChat(data);

              case 2:
                message = _context.sent;
                // Send the chat to the reciever
                socket.to(users[message.reciever]).emit('message', message);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    socket.on('disconnect', function () {
      return delete users[userEmail];
    });
  });
}

var createChat = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
    var message;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            message = _models.Chat.create(data);
            _context2.next = 7;
            break;

          case 4:
            _context2.prev = 4;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 7:
            return _context2.abrupt("return", message);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 4]]);
  }));

  return function createChat(_x2) {
    return _ref2.apply(this, arguments);
  };
}();