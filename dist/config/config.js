"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  development: {
    username: "postgres",
    password: "newman00",
    database: "tundra-chats",
    host: "postgres",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_production",
    host: "postgres",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "postgres",
    dialect: "postgres"
  }
};
exports["default"] = _default;