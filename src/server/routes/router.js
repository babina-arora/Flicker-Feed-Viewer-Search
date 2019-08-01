const express = require('express');
const router = express.Router();
const request = require("request-promise");
const config = require('../config/config');

router.route('/getFlickrFeed/:tag').get(function (req, res) {
  const tag = req.params.tag !== 'none' ? req.params.tag : '';
  const apiUrl = config.FLICKR_API_URL +tag+'';
  console.log(apiUrl);
  request({
    method: "GET",
    dataType: 'json',
    uri: apiUrl,
    resolveWithFullResponse: true,
    json: true
  }).then ((response) => {
    res.send(response);
  })
});

router.get('*', function (req, res) {
  res.status(404).json({
    error: 'Not Found'
  });
});

module.exports = router;
