"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("./controllers");

var router = (0, _express.Router)(); // Authentication Routes

router.post('/login', _controllers.loginAccount); // Search Routes

var _default = router;
exports["default"] = _default;