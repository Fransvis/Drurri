var express = require('express'),
    router  = express.Router();


router.get('/', function(req, res){
  res.render('./packages/packages');
});

router.get('/business', function(req, res){
  res.render('./packages/business');
});

router.get('/business/pride', function(req, res){
  res.render('./packages/pride');
});

module.exports = router;