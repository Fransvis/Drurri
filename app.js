var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose");
    packageRoutes   = require('./routes/packages'),
    serviceRoutes   = require('./routes/services'),
    freelancerRoutes = require('./routes/freelancer')


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/workBit_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ===================
// Landing Page 
// ===================

app.get("/", function(req, res){
    res.render("landing");
});

// ==============
// About Page
// ==============

app.get("/about", function(req, res){
    res.render("about");
});



// var express     = require("express"),
//     router      = express.Router(),
// 	User        = require("../models/user"),
// 	passport    = require("passport")

// router.post("/register", function(req, res){
// 	// Sign new User up
// 	var newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err, user){
// 		if(err){
// 			// if err redirect to form
// 			console.log(err);
// 			return res.render("authDirectory/register");
// 		}
// 		// Create new User
// 		passport.authenticate("local")(req, res, function(){
// 			res.redirect("/")
// 		});
// 	});
// });

// router.get("/login", function(req, res){
// 	res.render("authDirectory/login");
// });

// Assume User exists and log them in
// If they do not exist redirect to login form
// router.post("/login", passport.authenticate("local", 
// 			{
// 	 			successRedirect: "/",
// 				failureRedirect: "/login"
// 			}),
			
// 			function(req, res){
	
// });

// router.get("/logout", function(req, res){
// 	req.logout();
// 	res.redirect("/")
// });


app.use('/packages', packageRoutes);
app.use('/services', serviceRoutes);
app.use('/freelancer', freelancerRoutes);

app.listen("3000", function(){
    console.log("WorkbitApp running");
});

