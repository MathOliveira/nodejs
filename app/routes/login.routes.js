module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // User authentication
  app.get("/login", users.login);
};
