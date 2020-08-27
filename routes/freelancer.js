const express       = require('express');
const bodyParser    = require('body-parser');
const passport      = require('passport');
const FreelanceUser = require('../models/freelanceUser');
var router          = express.Router();

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login')
}

// Freelance sign up handle logic

router.get("/", function(req, res){
  res.render("./packages/freelance", {currentUser: req.user});
});


    router.post('/', (req, res) => {
        const freelancerName    = req.body.freelancerFirstName;
        const freelancerSurname = req.body.freelancerLastName;
        const username          = req.body.username;
      
        var newFreelanceUser = new FreelanceUser(
          {
            freelancerName: freelancerName,
            freelancerSurname: freelancerSurname,
            username: username,
            jobTitle: "default",
            location: "default"
          }
        )
      
        FreelanceUser.register(newFreelanceUser, req.body.password, function(err, newlyCreatedFreelanceUser){
          if(err){
            console.log(err);
            res.render('./packages/freelance');
          }
          passport.authenticate('local')(req, res, function() {
            console.log(freelancerName);
          });
        });
        res.redirect('/');
      });

      // freelance create profile logic

    router.get('/:id/createprofile', (req, res) => {
      var currentUser = req.user;
      res.render('./freelancer/createProfile', {currentUser: req.user})
    });

      router.post('/:id/createprofile', (req, res) => {
        var currentUser = req.user;
        const job = req.body.job;
        const location = req.body.location;

        FreelanceUser.findOneAndUpdate({_id: currentUser.id}, 
          {
            jobTitle: job, 
            location: location
          }, function(err, updatedFreelancer){
          if(err){
            console.log(err);
          } else {
            res.redirect('/freelancer/:id/profile');
          }
        });
        });

    
    
    router.get('/:id/profile', (req, res) => {
      var currentUser = req.user;
      console.log(currentUser);
      res.render('./freelancer/profile', {currentUser: req.user});
    });
    



    module.exports = router;