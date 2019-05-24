const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/:business/:position/:pageId?", (req, res) => {
      const actualPage = "/position";
      const queryParams = {
        business: req.params.business,
        position: req.params.position,
        pageId: req.params.pageId
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/:business", (req, res) => {
      const actualPage = "/business";
      const queryParams = { business: req.params.business };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
