const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const router = require('./routes/router');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next()
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', router);

// error handler, will be used for throwing validation errors
app.use((err, req, res, next) => {

  logger.error("Error validating request parameters ", {
    'error': err,
    'component': 'app.js'
  });

  res.status(400).json(err);
});

module.exports = app;
