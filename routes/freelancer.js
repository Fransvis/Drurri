var express       = require('express'),
    FreelanceUser = require('../models/freelanceUser'),
    router        = express.Router();


    router.get('/:id/createprofile', (req, res) => {
        res.render('./freelancer/createProfile')
      })
    
    
    router.get('/:id/profile', (req, res) => {
      res.render('./freelancer/profile');
    });
    



    module.exports = router;