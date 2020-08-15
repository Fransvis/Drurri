// const PersonalUser        = require('../models/user');
const FreelanceUser       = require('../models/user');
const bodyParser       = require('body-parser');
const passport     = require('passport');

var express = require('express'),
    router  = express.Router();


router.get('/', function(req, res){
  res.render('./packages/packages');
});

// ===============================
// Business Packages
// ===============================

router.get('/business', function(req, res){
  res.render('./packages/business');
});


router.get('/business/pride', function(req, res){
  res.render('./packages/pride');
});


router.post('/business/pride', (req, res) => {
  res.send('Signing Up for Pride')
});

router.get('/business/gold', function(req, res){
  res.render('./packages/gold');
});

router.get('/business/platinum', function(req, res){
  res.render('./packages/platinum');
});

router.get('/business/retainer', function(req, res){
  res.render('./packages/retainer');
});



// =====================
// Freelance package
// =====================

router.get('/freelance', function(req, res){
  res.render('./packages/freelance');
});

router.post('/freelance', (req, res) => {
  const firstName = req.body.freelancerFirstName;
  const lastName  = req.body.freelancerLastName;
  const username  = req.body.username;

  var newFreelanceUser = new FreelanceUser(
    {
      firstName: firstName,
      lastName: lastName,
      username: username
    }
  )

  FreelanceUser.register(newFreelanceUser, req.body.password, function(err, newlyCreatedFreealanceUser){
    if(err){
      console.log(err);
      res.render('./packages/freelance');
    }
    passport.authenticate('local')(req, res, function(){
      console.log(firstName);
      res.redirect('/freelancer/id')
    })
  })
  });




// =====================
// Personal Package
// =====================

router.get('/personal', (req, res) => {
  res.render('./packages/personal');
});

// router.post('/personal', (req, res) => {
//   const firstName = req.body.personalFirstName;
//   const lastName  = req.body.personalLastName;
//   const userName  = req.body.username;

//   var newPersonalUser = new PersonalUser(
//     {
//     firstName: firstName, 
//     lastName: lastName,
//     username: userName,
//   }
//   ); 

//   PersonalUser.register(newPersonalUser, req.body.password, function(err, newlyCreatedPersonalUser){
//     if(err){
//       console.log(err);
//       return res.render('./packages/personal');
//     } 
//     passport.authenticate('local')(req, res, function() {
//       console.log(firstName)
//       res.redirect('/services')
//     });
//   });
// });




module.exports = router;