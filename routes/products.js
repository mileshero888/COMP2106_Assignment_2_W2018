var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/products', function(req, res, next) {
  res.send('Products List');
});

module.exports = router;
