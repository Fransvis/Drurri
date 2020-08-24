const express       = require('express');
const bodyParser    = require('body-parser');
const passport      = require('passport');
const FreelanceUser = require('../models/freelanceUser');
const router        = express.Router();
freelancers = [1,3];

// Freelance sign up handle logic

    router.get('/', function(req, res){
      res.render('./packages/freelance');
    });


    router.post('/', (req, res) => {
        const freelancerName    = req.body.freelancerFirstName;
        const freelancerSurname = req.body.freelancerLastName;
        const username          = req.body.username;
      
        var newFreelanceUser = new FreelanceUser(
          {
            freelancerName: freelancerName,
            freelancerSurname: freelancerSurname,
            username: username
          }
        )
      
        FreelanceUser.register(newFreelanceUser, req.body.password, function(err, newlyCreatedFreelanceUser){
          if(err){
            console.log(err);
            res.render('./packages/freelance');
          }
          passport.authenticate('local')(req, res, function() {
            console.log(freelancerName)
          });
        });
        res.redirect('/freelancer/:id/createprofile');
        freelancers.push(newFreelanceUser);
      });

      // freelance create profile logic


    router.get('/:id/createprofile', (req, res) => {
      console.log(freelancers);
      res.render('./freelancer/createProfile')
      });

      router.post('/:id/createprofile', (req, res) => {
        // post information from form to user and redirect to profile page
      });
    
    
    router.get('/:id/profile', (req, res) => {
      // find user info and display it
      // console.log(freelancers)
      res.render('./freelancer/profile');
    });
    



    module.exports = router;