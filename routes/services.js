var express = require('express'),
    router  = express.Router();

router.get("/", function(req, res){
  res.render("services");
});

router.get("/photography", function(req, res){
  var photograpphers = [
    {name: Peter Labus}
  ]
  res.render("photography");
});

router.get('/graphic-design', (req, res) => {
  res.render('graphicDesign');
});

module.exports = router;
