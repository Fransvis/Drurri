const PersonalUser        = require('../models/user');
const BusinessUser        = require('../models/businessUser');
const FreelanceUser       = require('../models/freelanceUser');
const bodyParser       = require('body-parser');
const passport     = require('passport');

var express = require('express'),
    router  = express.Router();


router.get('/', function(req, res){
  res.render('./packages/packages',);
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
  const businessName = req.body.businessName;
  const businessIndustry = req.body.businessIndustry;
  const businessAddress = req.body.businessAddress;
  const businessContact = req.body.businessContact;
  const username        = req.body.username;
  
  var newBusinessUser = new BusinessUser(
    {
      username: username,
      pride: {
      businessName: businessName,
      businessIndustry: businessIndustry,
      businessAddress: businessAddress,
      businessContact: businessContact,
      }
    }
  )

  BusinessUser.register(newBusinessUser, req.body.password, function(err, newlyCreatedBusinessUser){
    if(err){
      console.log(err);
      res.render('./packages/pride')
    }
    passport.authenticate('local')(req, res, function(){
    })
  });
  console.log(businessName);
  console.log(businessIndustry);
  console.log(businessContact);
  console.log(businessAddress);
  console.log(username);
  res.redirect('/')
});

router.get('/business/gold', function(req, res){
  res.render('./packages/gold');
});

router.post('/business/gold', (req, res) => {
  const businessName = req.body.businessName;
  const businessIndustry = req.body.businessIndustry;
  const businessAddress = req.body.businessAddress;
  const businessContact = req.body.businessContact;
  const username        = req.body.username;

   
  var newBusinessUser = new BusinessUser(
    {
      username: username,
      gold: {
      businessName: businessName,
      businessIndustry: businessIndustry,
      businessAddress: businessAddress,
      businessContact: businessContact,
      }
    }
  );
  
  BusinessUser.register(newBusinessUser, req.body.password, function(err, newlyCreatedBusinessUser){
    if(err){
      console.log(err);
      res.render('./packages/pride')
    }
    passport.authenticate('local')(req, res, function(){
      // console.log(businessName);
      // console.log(businessIndustry);
      // console.log(businessContact);
      // console.log(businessAddress);
      // console.log(username);
    })
  });
  res.redirect('/')
});

router.get('/business/platinum', function(req, res){
  res.render('./packages/platinum');
});

router.get('/business/retainer', function(req, res){
  res.render('./packages/retainer');
});








// =====================
// Personal Package
// =====================

router.get('/personal', (req, res) => {
  res.render('./packages/personal');
});

router.post('/personal', (req, res) => {
  const firstName = req.body.personalFirstName;
  const lastName  = req.body.personalLastName;
  const userName  = req.body.username;

  var newPersonalUser = new PersonalUser(
    {
    firstName: firstName, 
    lastName: lastName,
    username: userName,
  }
  ); 

  PersonalUser.register(newPersonalUser, req.body.password, function(err, newlyCreatedPersonalUser){
    if(err){
      console.log(err);
      return res.render('./packages/personal');
    } 
    passport.authenticate('local')(req, res, function() {
      console.log(firstName)
    });
  });
  res.redirect('/services')
});




module.exports = router;