var express = require('express'),
    router  = express.Router();


    router.get('/id', (req, res) => {
      res.render('./freelancer/createProfile');
    })
    
    
    router.get('/id/profile', (req, res) => {
      res.render('./freelancer/profile');
    });
    



    module.exports = router;