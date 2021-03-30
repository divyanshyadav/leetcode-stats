import express from "express";
import App from "../components/app";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

router.get("/", async (req, res) => {
  const theHtml = `
    <html>
      <head>
        <title>Sheet-Analysis</title>
      </head>
      <body>
        <div id="app">{{{app}}}</div>
        <script src="/app.js" charset="utf-8"></script>
        <script src="/vendor.js" charset="utf-8"></script>
      </body>
    </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ app: reactComp });
  res.send(htmlToSend);
});

export default router;