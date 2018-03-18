var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  var ConnectionState="Not Connected";	
  if(mongoose.connection.readyState == 1){
  	ConnectionState="Connection Successfull To mongoose";
  }
  res.render('index', { title: ConnectionState });
});

module.exports = router;
