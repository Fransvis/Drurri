var express        = require('express'),
    LocalStrategy  = require('passport-local'),
    BusinessUser   = require('../models/businessUser'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    router         = express.Router()

var express = require('express'),
    router  = express.Router();

    // passport.use('business', new LocalStrategy('businessLocal', BusinessUser.authenticate()));
    // passport.use(BusinessUser.createStrategy());
    // passport.serializeUser(BusinessUser.serializeUser());
    // passport.deserializeUser(BusinessUser.deserializeUser());




// passport.use(new LocalStrategy( BusinessUser.authenticate()));
// passport.use( BusinessUser.createStrategy());
// passport.serializeUser( BusinessUser.serializeUser());
// passport.deserializeUser( BusinessUser.deserializeUser());

// ===============================
// Business Packages
// ===============================

router.get('/', function(req, res){
  res.render('./packages/business');
});


router.get('/pride', function(req, res){
  res.render('./packages/pride');
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

router.get('/gold', function(req, res){
  res.render('./packages/gold');
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

router.get('/platinum', function(req, res){
  res.render('./packages/platinum');
});

router.get('/retainer', function(req, res){
  res.render('./packages/retainer');
});



module.exports = router;