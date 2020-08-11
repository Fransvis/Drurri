const User         = require('../models/user');
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




// =====================
// Personal Package
// =====================

router.get('/personal', (req, res) => {
  res.render('./packages/personal');
});

router.post('/personal', (req, res) => {
  var newUser = new User({username: req.body.username}); 
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('./packages/personal');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/services');
    })
  });
});



module.exports = router;