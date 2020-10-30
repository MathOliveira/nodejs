module.exports = app => {
  const news = require("../controllers/news.controller.js");

  // Create a new News
  app.post("/news", news.create);

  // Retrieve all News
  app.get("/news", news.findAll);

  // Retrieve a single News with newsId
  app.get("/news/:newsId", news.findOne);

  // Retrieve News list by slug
  app.get("/news/slug/:slug", news.findBySlug);

  // Update a News with newsId
  app.put("/news/:newsId", news.update);

  // Delete a News with newsId
  app.delete("/news/:newsId", news.delete);

  // Delete all News
  app.delete("/news", news.deleteAll);
};
