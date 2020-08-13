var express          = require("express"),
    app              = express(),
    mongoose         = require("mongoose"),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    packageRoutes    = require('./routes/packages'),
    serviceRoutes    = require('./routes/services'),
    freelancerRoutes = require('./routes/freelancer'),
    User             = require('./models/user');


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/drurri_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

// ========================
// PASSPORT CONFIGURATION
// ========================

app.use(require('express-session')({
    secret: 'one one one',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




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


app.use('/packages', packageRoutes);
app.use('/services', serviceRoutes);
app.use('/freelancer', freelancerRoutes);

app.listen("3000", function(){
    console.log("WorkbitApp running");
});

