var express = require('express'),
    router  = express.Router();

router.get("/", function(req, res){
  res.render("services");
});

router.get("/photography", function(req, res){
  var photographers = [
    {
    name: "Peter Labuschagne", 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', 
    location: "Barcelona, Spain", 
    industry: "Weddings"
  },
    {
      name: "Justin Coomber", 
      image: 'https://images.unsplash.com/photo-1534455700361-eca9c3dbc981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 
      location: "Sydney, Australia", 
      industry: "Wildlife"
    },
    {
      name: "Anel Visser", 
      image: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 
      location: "Orlando, Florida", 
      industry: "Business"
    }
  ]
  res.render("photography", {photographers: photographers});
});

router.get('/graphic-design', (req, res) => {
  res.render('graphicDesign');
});

module.exports = router;
