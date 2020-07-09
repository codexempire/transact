"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = exports.createAccount = exports.loginAccount = void 0;

var _models = require("../models");

var _validator = require("./validator");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, userExists, passwordMatches, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password; // Find user by email

            _context.next = 3;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 3:
            userExists = _context.sent;

            if (userExists) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Invalid email or password'
            }));

          case 6:
            _context.next = 8;
            return (0, _validator.passwordComparer)(password, userExists.password);

          case 8:
            passwordMatches = _context.sent;

            if (passwordMatches) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'Invalid email or password'
            }));

          case 11:
            delete userExists.password;
            delete userExists.verificationPin;
            delete userExists.socketsId; // sign token

            _context.next = 16;
            return (0, _validator.signToken)(userExists);

          case 16:
            token = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              token: token
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginAccount = loginAccount;

var createAccount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, firstName, lastName, email, password, userExists, hashedPassword, verificationPin, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password; // check if the email has been used

            _context2.next = 3;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 3:
            userExists = _context2.sent;

            if (!userExists) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              error: 'Email has been used'
            }));

          case 6:
            _context2.next = 8;
            return (0, _validator.hashedPassword)(password);

          case 8:
            hashedPassword = _context2.sent;
            // create a verification pin
            verificationPin = 0; // insert into the database

            _context2.next = 12;
            return _models.User.create({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword,
              verificationPin: verificationPin
            });

          case 12:
            user = _context2.sent;
            delete user.password;
            delete user.verificationPin;
            delete user.socketsId; // send a verification email
            // sign token

            token = (0, _validator.signToken)(user); // response on success

            return _context2.abrupt("return", res.status(201).json({
              token: token
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAccount = createAccount;

var verifyEmail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var email, validationPin, userExists;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.tokenData.email;
            validationPin = req.body.validationPin; // check if the account exist and has not been verified

            _context3.next = 4;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 4:
            userExists = _context3.sent;

            if (userExists) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(409).json({
              error: 'Email has not been registered on the server'
            }));

          case 7:
            if (!userExists.verified) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              data: 'User is verified'
            }));

          case 9:
            if (!(userExists.verificationPin !== validationPin)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: 'Validation pin does not match'
            }));

          case 11:
            _context3.next = 13;
            return userExists.update({
              verified: true
            });

          case 13:
            return _context3.abrupt("return", res.status(200).json({
              data: 'User has been verified'
            }));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function verifyEmail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verifyEmail = verifyEmail;