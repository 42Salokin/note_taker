const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/apiRoute.js');
const html = require('./routes/htmlRoute.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', html)

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);