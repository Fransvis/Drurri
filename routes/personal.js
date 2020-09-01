var express        = require('express'),
    LocalStrategy  = require('passport-local'),
    PersonalUser   = require('../models/user'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    router         = express.Router()


    // passport.use('personal', new LocalStrategy('personalLocal', PersonalUser.authenticate()));
    // passport.use(PersonalUser.createStrategy());
    // passport.serializeUser(PersonalUser.serializeUser());
    // passport.deserializeUser(PersonalUser.deserializeUser());

// =====================
// Personal Package
// =====================

    router.get('/', (req, res) => {
      res.render('./packages/personal');
    });

    router.post('/', (req, res) => {
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
        passport.authenticate('personal')(req, res, function() {
          console.log(firstName)
        });
        req.login(newPersonalUser, (err) => {
          if(err){
            console.log(err);
          } else {
            return res.redirect('/services')
          }
        });
      });
    });

    module.exports = router;