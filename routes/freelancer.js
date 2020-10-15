const { render } = require('ejs');

var express                  = require('express'),
    router                   = express.Router(),
    passportLocalMongoose    = require('passport-local-mongoose'),
    LocalStrategy            = require('passport-local'),
    bodyParser               = require('body-parser'),
    passport                 = require('passport'),
    Project                  = require('../models/projects'),
    FreelanceUser            = require('../models/freelanceUser')


// ================================
//          MIDDLEWARE
// ================================


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login')
}


// =======================
//     Sign up page
// =======================

router.get("/", function(req, res){
  res.render("./freelancer/freelance", {currentUser: req.user});
});


router.post('/', (req, res) => {
    const freelancerName    = req.body.Name;
    const freelancerSurname = req.body.Surname;
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
//        CREATE PROFILE 
// ================================

router.get('/:id/createprofile', (req, res) => {
    var currentUser = req.user;
    console.log(currentUser)
    res.render('./freelancer/createProfile', {currentUser: req.user})
  });

router.post('/:id/createprofile', (req, res) => {

    var currentUser  = req.user;
    const industry   = req.body.industry;
    const location   = req.body.location;
    const about      = req.body.about;
    const link1      = req.body.link1;
    const specialty  = req.body.specialty;
    const picture    = req.body.picture;
    const link2      = req.body.link2;
    const tools      = req.body.tools;
    const cover      = req.body.cover;

    FreelanceUser.findOneAndUpdate({_id: currentUser._id}, 
      {
        industry: industry, 
        location: location,
        about: about,
        specialty: specialty,
        picture: picture,
        link1: link1,
        link2: link2,
        tools: tools,
        coverPhoto: cover
      }, function(err, updatedFreelancer){
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

// ==========================
//    PROFILE SHOW PAGE 
// ==========================
    
    
router.get('/:id/profile', (req, res) => {
  var currentUser = req.user;
      
  FreelanceUser.findById(req.params.id).populate('projects').exec(function(err, foundFreelancer) {
    if(err){
      console.log(err);
    } else {
      res.render('./freelancer/profile', {freelancer: foundFreelancer, currentUser: req.user});
    }
  });
});

// =========================
//    EDIT USER PROFILE
// =========================

router.get('/:id/profile/edit', (req, res) => {

 FreelanceUser.findById(req.params.id, (err, foundFreelancer) => {
    if (err){
      res.redirect('/');
    } else {
      res.render("./freelancer/edit", {freelancer: foundFreelancer, currentUser: req.user});
    }
  })
});

router.put('/:id/profile', (req, res) => {

   FreelanceUser.findByIdAndUpdate(req.params.id, req.body.freelancer, (err, updatedFreelancer) => {
    if(err) {
      res.redirect('/');
    } else {
      res.redirect('/freelancer/' + req.params.id + '/profile');
      console.log(updatedFreelancer);
    }
  });
});


// ===================================
//   ADD PROJECT TO SPECIFIC USER
// ===================================

router.get('/:id/profile/addProject',  (req, res) => {
  if(req.isAuthenticated()){
    FreelanceUser.findById(req.params.id, (err, freelancer) => {
      if(err){
        console.log(err);
      } else {
        if(freelancer._id.equals(req.user._id)) {
          res.render('./freelancer/addProject', {freelancer: freelancer, currentUser: req.user});
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
      res.redirect('/');
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
      });
    }
  }); 
});


// ==========================
//     PROJECT SHOW PAGE
// ==========================

router.get('/:id/profile/showProject', (req, res) => {
      
  Project.findById(req.params.id, (err, foundProject) => {
    if(err){
      console.log(err);
      res.redirect('./freelancer/:id/profile')
    } else {
      res.render('./freelancer/project', {project: foundProject, currentUser: req.user});
    }
  });
});


// =====================
// PROJECT EDIT PAGE
// =====================

router.get('/:id/profile/showProject/edit', (req, res) => {
  
  Project.findById(req.params.id, (err, foundProject) => {
    if(err){
      res.redirect('/freelancer/:id/profile/showProject')
    } else {
      res.render('./freelancer/project-edit', {project: foundProject, currentUser: req.user});
    }
  });
});

router.put('/:id/profile/showProject', (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body.project, (err, updatedProject) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/freelancer/' + req.params.id + '/profile/showProject');
    }
  });
});

// =====================
// PROJECT DELETE PAGE
// =====================

router.delete('/:id/profile/showProject', (req, res) => {
  Project.findByIdAndDelete(req.params.id, (err) => {
    if(err){
      res.redirect('/freelancer/:id/profile/showProject');
    } else {
      res.redirect('/freelancer/:id/profile');
    }
  });
});
    



module.exports = router;