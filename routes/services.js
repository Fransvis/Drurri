var express       = require('express'),
    router        = express.Router(),
    FreelanceUser = require('../models/freelanceUser')

router.get("/", function(req, res){
  res.render("services", {currentUser: req.user});
});

router.get("/photography", function(req, res){
  FreelanceUser.find({jobTitle: 'photographer'}, (err, freelancers) => {
    if(err){
      console.log(err);
    } else {
      res.render("photography", {freelancers: freelancers, currentUser: req.user});
    }
  })
});

router.get('/graphic-design', (req, res) => {
  res.render('graphicDesign');
});

module.exports = router;
