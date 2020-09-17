var express        = require('express'),
    LocalStrategy  = require('passport-local'),
    BusinessUser   = require('../models/businessUser'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    router         = express.Router()

var express = require('express'),
    router  = express.Router();

// ===============================
// Business Packages
// ===============================

router.get('/', function(req, res){
  res.render('./business/business');
});

// ===============================
// pride package
// ===============================

router.get('/pride', function(req, res){
  res.render('./business/pride');
});


router.post('/pride', (req, res) => {
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
    passport.authenticate('business')(req, res, function(){
      console.log(businessName)
    })
    req.login(newBusinessUser, (err) => {
      if(err){
        console.log(err);
      } else {
        return res.redirect('/services')
      }
    });
  });
});

// ===============================
// Gold Package
// ===============================

router.get('/gold', function(req, res){
  res.render('./business/gold');
});

router.post('/gold', (req, res) => {
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
      res.render('./packages/gold')
    }
    passport.authenticate('local')(req, res, function(){
      console.log(businessName);
    });
    req.login(newBusinessUser, (err) => {
      if(err){
        console.log(err);
      } else {
        return res.redirect('/services')
      }
    });
  });
});

// ===============================
// Platinum Package
// ===============================


router.get('/platinum', function(req, res){
  res.render('./business/platinum');
});

router.post('/platinum', (req, res) => {
  const businessName = req.body.businessName;
  const businessIndustry = req.body.businessIndustry;
  const businessAddress = req.body.businessAddress;
  const businessContact = req.body.businessContact;
  const username        = req.body.username;

  var newBusinessUser = new BusinessUser(
    {
      username: username,
      platinum: {
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
      res.render('./packages/platinum')
    }
    passport.authenticate('local')(req, res, function(){
      console.log(businessName);
    });
    req.login(newBusinessUser, (err) => {
      if(err){
        console.log(err);
      } else {
        return res.redirect('/services')
      }
    });
  });
});

router.get('/retainer', function(req, res){
  res.render('./business/retainer');
});

router.post('/retainer', (req, res) => {
  const businessName = req.body.businessName;
  const businessIndustry = req.body.businessIndustry;
  const businessAddress = req.body.businessAddress;
  const businessContact = req.body.businessContact;
  const username        = req.body.username;

  var newBusinessUser = new BusinessUser(
    {
      username: username,
      retainer: {
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
      res.render('./packages/retainer')
    }
    passport.authenticate('local')(req, res, function(){
      console.log(businessName);
    });
    req.login(newBusinessUser, (err) => {
      if(err){
        console.log(err);
      } else {
        return res.redirect('/services')
      }
    });
  });
})



module.exports = router;