var express       = require('express'),
    router        = express.Router(),
    passportLocalMongoose = require('passport-local-mongoose'),
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
          }
        )
      
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
        const industry = req.body.industry;
        const location = req.body.location;
        const about = req.body.about;
        const link1 = req.body.link1;
        const specialty = req.body.specialty;
        const picture = req.body.picture;
        const link2 = req.body.link2;
        const tools = req.body.tools;

        // FreelanceUser.findOneAndUpdate({_id: currentUser._id}, 
        //   {
        //     industry: industry,
        //     location: location
        //   }, function(err, updatedFreelancer){
        //     if(err){
        //       console.log(err)
        //     } else {
        //       res.redirect('/')
        //     }
        //   })

        FreelanceUser.findOneAndUpdate({_id: currentUser._id}, 
          {
            industry: industry, 
            location: location,
            about: about,
            specialty: specialty,
            picture: picture,
            link1: link1,
            link2: link2,
            tools: tools
          }, function(err, updatedFreelancer){
          if(err){
            console.log(err);
          } else {
            res.redirect('/');
          }
        });

    });

    
    
    router.get('/:id/profile', (req, res) => {
      var currentUser = req.user;
      console.log(currentUser);

      FreelanceUser.findById(req.params.id, (err, foundFreelancer) => {
        if(err){
          console.log(err);
        } else {
          res.render('./freelancer/profile', {freelancer: foundFreelancer, currentUser: req.user});
        }
      })
    });
    



    module.exports = router;