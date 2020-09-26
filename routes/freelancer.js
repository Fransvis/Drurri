var express                  = require('express'),
    router                   = express.Router(),
    // mongoose      = require('mongoose'),
    passportLocalMongoose    = require('passport-local-mongoose'),
    LocalStrategy            = require('passport-local'),
    bodyParser               = require('body-parser'),
    passport                 = require('passport'),
    Project                  = require('../models/projects'),
    FreelanceUser            = require('../models/freelanceUser')
    // multer                   = require('multer')



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login')
}

// ================================
// Freelance sign up handle logic
// ================================

// ==============
// Sign up page
// ==============

router.get("/", function(req, res){
  res.render("./freelancer/freelance", {currentUser: req.user});
});


    router.post('/', (req, res) => {
        const freelancerName    = req.body.Name;
        const freelancerSurname = req.body.Surname;
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

// ================================
// add additional information
// ================================

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

// ======================
// Display User profile 
// ======================
    
    
    router.get('/:id/profile', (req, res) => {
      var currentUser = req.user;
      // console.log(currentUser);
      

      FreelanceUser.findById(req.params.id).populate('projects').exec(function(err, foundFreelancer) {
        if(err){
          console.log(err);
        } else {
          // console.log(foundFreelancer)
          res.render('./freelancer/profile', {freelancer: foundFreelancer, currentUser: req.user});
        }
      });
    });

// ======================
// Edit User profile 
// ======================

router.get('/:id/profile/edit', (req, res) => {

  FreelanceUser.findById(req.params.id, (err, foundFreelancer) => {
    if (err){
      res.redirect('/');
    } else {
      res.render("./freelancer/edit", {freelancer: foundFreelancer});
    }
  })
});


// =====================
// Add Project to user
// =====================

        // go and check for currentUser middleware on app.js (campground auth part 2 vid)
        // write checkprofileOwnership middleware
    router.get('/:id/profile/addProject',  (req, res) => {
      if(req.isAuthenticated()){
        FreelanceUser.findById(req.params.id, (err, freelancer) => {
          if(err){
            console.log(err);
          } else {
            if(freelancer._id.equals(req.user._id)) {
              res.render('./freelancer/addProject', {freelancer: freelancer});
            } else {
              res.send("You do not have permission")
            }
          }
        });
      } else{
        res.send("You are not authenitcated")
      }
    });


router.post('/:id/profile/addProject', (req, res) => {      

      FreelanceUser.findById(req.params.id, (err, freelancer) => {
        if(err){
          console.log(err);
          res.redirect('/')
        } else {

          const title = req.body.title;
          const date  = req.body.date
          const image = req.body.image;
          const newProject = {
            title: title,
            date: date,
            image: image
          }


          // Creating duplicate
          
          Project.create(newProject, (err, project) =>{
            if(err){
              console.log(err);
            } else {
              freelancer.projects.push(project)
              freelancer.save();
              res.redirect('/freelancer/' + freelancer._id + '/profile')
              console.log(project);
            }
          })
        }
      });

      
    });



// =====================
// Project show page
// =====================

    router.get('/:id/profile/showProject', (req, res) => {
      
      Project.findById(req.params.id, (err, foundProject) => {
        if(err){
          console.log(err);
          res.redirect('./freelancer/:id/profile')
        } else {
          // console.log(foundProject)
          res.render('./freelancer/project', {project: foundProject})
        }
      })
    });
    



    module.exports = router;