var express = require('express'),
    router  = express.Router();

router.get("/", function(req, res){
  res.render("services");
});

router.get("/photography", function(req, res){
  res.render("photography");
});

module.exports = router;
