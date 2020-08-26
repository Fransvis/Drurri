const express       = require('express');
const bodyParser    = require('body-parser');
const passport      = require('passport');
const FreelanceUser = require('../models/freelanceUser');
var router          = express.Router();
var freelancers     = [0]

// Freelance sign up handle logic

router.get("/", function(req, res){
  // console.log(freelancers)
  res.render("./packages/freelance");
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
            freelancers.push(newFreelanceUser);
            freelancers.shift();
            res.redirect('/freelancer/:id/createprofile');
          });
        });
      });

      // freelance create profile logic

    router.get('/:id/createprofile', (req, res) => {
      console.log(freelancers)
      res.render('./freelancer/createProfile');
      });

      router.post('/:id/createprofile', (req, res) => {
        // const jobTitle = req.body.job;
        // const location = req.body.location;

          // freelancers[0].jobTitle = jobTitle;
          // freelancers[0].location = location;
          
         var currentFreelancer =  FreelanceUser.find({freelancerName: freelancers[0].freelancerName});
         console.log(currentFreelancer);
         
        res.redirect('/freelancer/:id/profile')
        // post information from form to user and redirect to profile page
      });
    
    
    router.get('/:id/profile', (req, res) => {
      console.log(freelancers[0].freelancerName)

      console.log(freelancers)
      // find user info and display it
      // console.log(freelancers)
      res.render('./freelancer/profile');
    });
    



    module.exports = router;