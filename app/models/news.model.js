const sql = require("./db.js");

// constructor
const News = function(news) {
  this.img = news.img;
  this.title = news.title;
  this.id_author = news.id_author;
  this.content = news.content;
  this.date = news.date;
  this.slug = news.slug;
};

News.create = (newNews, result) => {
  sql.query("INSERT INTO news SET ?", newNews, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created news: ", { id: res.insertId, ...newNews });
    result(null, { id: res.insertId, ...newNews });
  });
};

News.findById = (newsId, result) => {
  sql.query(`SELECT * FROM news WHERE id = ${newsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found news: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found News with the id
    result({ kind: "not_found" }, null);
  });
};


News.getAll = (slug, limit, offset, result) => {
  slug = (typeof slug !== 'undefined') ? `WHERE slug = "${slug}"` : ``;
  sql.query(`SELECT * FROM news ${slug} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("news: ", res);
    result(null, res);
  });
};

News.updateById = (id, news, result) => {
  sql.query(
    "UPDATE news SET img = ?, title = ?, id_author = ?, content = ?, date = ?, slug = ? WHERE id = ?",
    [news.img, news.title, news.id_author, news.content, news.date, news.slug, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found News with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated news: ", { id: id, ...news });
      result(null, { id: id, ...news });
    }
  );
};

News.remove = (id, result) => {
  sql.query("DELETE FROM news WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found News with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted news with id: ", id);
    result(null, res);
  });
};

News.removeAll = result => {
  sql.query("DELETE FROM news", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} news`);
    result(null, res);
  });
};

module.exports = News;
