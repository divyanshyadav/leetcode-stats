import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';
// import App from '../components/app';

const router = express.Router();

router.get('/', async (req, res) => {
    const theHtml = `
    <html>
      <head>
        <title>Leetcode stats</title>
      </head>
      <body>
        <div id="app">{{{app}}}</div>
        <script src="/vendor.js" charset="utf-8"></script>
        <script src="/app.js" charset="utf-8"></script>
      </body>
    </html>
  `;

    const hbsTemplate = hbs.compile(theHtml);
    // const reactComp = renderToString(<App />);
    const htmlToSend = hbsTemplate({ app: 'Loading...' });
    res.send(htmlToSend);
});

export default router;
