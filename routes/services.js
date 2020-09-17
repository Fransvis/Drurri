var express       = require('express'),
    router        = express.Router(),
    FreelanceUser = require('../models/freelanceUser')

router.get("/", function(req, res){
  res.render("./services/services", {currentUser: req.user});
});

router.get("/photography", function(req, res){
  FreelanceUser.find({industry: 'Photographer'}, (err, freelancers) => {
    if(err){
      console.log(err);
    } else {
      res.render("./services/photography", {freelancers: freelancers, currentUser: req.user});
    }
  })
});

router.get('/graphic-design', (req, res) => {
  FreelanceUser.find({industry: 'Graphic Designer'}, (err, freelancers) => {
    if(err){
      console.log(err);
    } else {
      res.render("./services/graphicDesign", {freelancers: freelancers, currentUser: req.user});
    }
  })
});

router.get('/contentCreation', (req, res) => {
  FreelanceUser.find({industry: 'Content Creator'}, (err, freelancers) => {
    if(err){
      console.log(err);
    } else {
      res.render("./services/contentCreation", {freelancers: freelancers, currentUser: req.user});
    }
  })
});

router.get('/webDesign', (req, res) => {
  FreelanceUser.find({industry: 'web designer'}, (err, freelancers) => {
    if(err){
      console.log(err);
    } else {
      res.render("./services/webDesign", {freelancers: freelancers, currentUser: req.user});
    }
  })
});

module.exports = router;
