export default {
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
}
