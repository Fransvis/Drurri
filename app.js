var express          = require("express"),
    app              = express(),
    mongoose         = require("mongoose"),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    packageRoutes    = require('./routes/packages'),
    serviceRoutes    = require('./routes/services'),
    freelancerRoutes = require('./routes/freelancer'),
    User             = require('./models/user'),
    FreelanceUser    = require('./models/freelanceUser'),
    BusinessUser     = require('./models/businessUser')


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

// ============================================
// pass currentUserInfo through to each template
// =============================================

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ========================
// PASSPORT CONFIGURATION
// ========================

app.use(require('express-session')({
    secret: 'This is my secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(FreelanceUser.authenticate()));
passport.use(FreelanceUser.createStrategy());
passport.serializeUser(FreelanceUser.serializeUser());
passport.deserializeUser(FreelanceUser.deserializeUser());



// ===================
// Landing Page 
// ===================

app.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});

// ==============
// About Page
// ==============

app.get("/about", function(req, res){
    res.render("about", {currentUser: req.user});
});

// Login form

app.get('/login', (req, res) => {
    res.render('sign-in');
})

// app.post('/login', middleware, callback)
app.post('/login', passport.authenticate('local', 
        {
            successRedirect: '/',
            failureRedirect: '/login'
    }
    ));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret', {currentUser: req.user});
});

// middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.use('/packages', packageRoutes);
app.use('/services', serviceRoutes);
app.use('/freelancer', freelancerRoutes);

app.listen("3000", function(){
    console.log("WorkbitApp running");
}); 

