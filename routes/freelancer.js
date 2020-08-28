var express       = require('express'),
    router        = express.Router(),
    LocalStrategy = require('passport-local'),
    bodyParser    = require('body-parser'),
    passport      = require('passport'),
    FreelanceUser = require('../models/freelanceUser');



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
        // const password          = req.body.password;
      
        var newFreelanceUser = new FreelanceUser(
          {
            freelancerName: freelancerName,
            freelancerSurname: freelancerSurname,
            username: username
            // password: password,
            // jobTitle: "default",
            // location: "default"
          }
        )

        // newFreelanceUser.save(req.body.password, function(err){
        //   if(err){
        //     console.log(err);
        //   } else {
        //     console.log('frelanceuser: ' + newFreelanceUser.username  + ' saved.');
        //     req.login(newFreelanceUser, function(err){
        //       if(err){
        //         console.log(err);
        //       }
        //       return res.redirect('/freelancer/:id/createprofile')
        //     })
        //   }
        // });
      
        FreelanceUser.register(newFreelanceUser, req.body.password, function(err, newlyCreatedFreelanceUser){
          if(err){
            console.log(err);
            res.render('./packages/freelance');
          }
          passport.authenticate('freelancerLocal')(req, res, function() {
            console.log(freelancerName);
          });
          req.login(newFreelanceUser, (err) => {
            if(err){
              console.log(err);
            } else {
              return res.redirect('freelancer/:id/createprofile')
            }
          });
        });
      });

      // freelance create profile logic

    router.get('/:id/createprofile', (req, res) => {
      var currentUser = req.user;
      console.log(currentUser)
      res.render('./freelancer/createProfile', {currentUser: req.user})
    });

      router.post('/:id/createprofile', (req, res) => {
        var currentUser = req.user;
        const job = req.body.job;
        const location = req.body.location;
        const about = req.body.about;
        const website = req.body.website;
        const instagram = req.body.istagram;

        FreelanceUser.findOneAndUpdate({_id: currentUser.id}, 
          {
            jobTitle: job, 
            location: location,
            about: about,
            website: website,
            instagram: instagram
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