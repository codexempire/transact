"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = exports.hashedPassword = exports.signToken = exports.passwordComparer = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();

var passwordComparer = function passwordComparer(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
};

exports.passwordComparer = passwordComparer;

var signToken = function signToken(data) {
  return _jsonwebtoken["default"].sign(data, process.env.SECRET_KEY);
};

exports.signToken = signToken;

var hashedPassword = function hashedPassword(password) {
  return bcrypt.hash(password, 10);
};

exports.hashedPassword = hashedPassword;

var createTransport = function createTransport() {
  return _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: 'yandex.code@gmail.com',
      pass: 'newman00'
    }
  });
};

var sendMail = function sendMail(mailOptions) {
  var transporter = createTransport();
  return transporter.sendMail(mailOptions);
};

exports.sendMail = sendMail;