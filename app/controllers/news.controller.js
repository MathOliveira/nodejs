const News = require("../models/news.model.js");

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a News
  const news = new News({
    mail: req.body.mail,
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  });

  // Save News in the database
  News.create(news, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    else res.send(data);
  });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  News.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    else res.send(data);
  });
};

// Find a single News with a newsId
exports.findOne = (req, res) => {
  News.findById(req.params.newsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found News with id ${req.params.newsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving News with id " + req.params.newsId
        });
      }
    } else res.send(data);
  });
};

// Find a News list by slug
exports.findBySlug = (req, res) => {
  News.findBySlug(req.params.slug, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found News with slug ${req.params.slug}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving News slug " + req.params.slug
        });
      }
    } else res.send(data);
  });
};

// Update a News identified by the newsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  News.updateById(
    req.params.newsId,
    new News(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found News with id ${req.params.newsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating News with id " + req.params.newsId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a News with the specified newsId in the request
exports.delete = (req, res) => {
  News.remove(req.params.newsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found News with id ${req.params.newsId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete News with id " + req.params.newsId
        });
      }
    } else res.send({ message: `News was deleted successfully!` });
  });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
  News.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all news."
      });
    else res.send({ message: `All News were deleted successfully!` });
  });
};
