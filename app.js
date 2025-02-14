var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    session               = require('express-session'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    LocalStrategy         = require('passport-local'),
    methodOverride        = require('method-override'),
    passportLocalMongoose = require('passport-local-mongoose'),
    
    // multer                = require('multer'),
    // path                  = require('path'),
    // helpers               = require('./helpers'),

    businessRoutes        = require('./routes/business'),
    serviceRoutes         = require('./routes/services'),
    freelancerRoutes      = require('./routes/freelancer'),
    personalRoutes        = require('./routes/personal'),

    FreelanceUser         = require('./models/freelanceUser'),
    PersonalUser          = require('./models/user'),
    BusinessUser          = require('./models/businessUser'),
    Projects              = require('./models/projects')


// =========================================
// set view engine, mongoose connection
// ========================================

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://FransVis:207878Av@@drurri.wzwr6.mongodb.net/drurri?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongoose.connect('mongodb://localhost:27017/drurri_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
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

app.use(session({
    secret: 'mysecretcode',
    name: 'drurri_com',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 5400000 },
  }));

app.use(passport.initialize());
app.use(passport.session());


passport.use('freelancer', new LocalStrategy('freelancerLocal', FreelanceUser.authenticate()));
passport.use('personal', new LocalStrategy('personalLocal', PersonalUser.authenticate()));
passport.use('business', new LocalStrategy('businessLocal', BusinessUser.authenticate()));

passport.use(FreelanceUser.createStrategy());
passport.use(PersonalUser.createStrategy());
passport.use(BusinessUser.createStrategy());


passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
  });




// ========================
//      STORAGE 
// ========================

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     }, 

//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname));
//     }
// });


// 

// passport.deserializeUser(function(id, done){
//     FreelanceUser.findById(id, (err, user) => {
//         if(err){
//             done(err);
//         } else if(user){
//             done(null, user);
//         } else {
//             BusinessUser.findById(id, (err, user) => {
//                 if(err){
//                     done(err);
//                 } else  {
//                     done(null, user)
//                 } 
//             }) 
//         } 
//     })
// }) 



// ===================
// Landing Page 
// ===================

app.get("/", function(req, res){
    res.render("./index/landing", {currentUser: req.user});
});

// ==============
// About Page
// ==============

app.get("/about", function(req, res){
    var currentUser = req.user
    console.log(currentUser)
    res.render("./index/about", {currentUser: req.user});
});


// ==============
// Packages Page
// ==============

app.get('/packages', function(req, res){
    res.render('./packages/packages',);
  });

// ==============
// Login Form
// ==============

app.get('/login', (req, res) => {
    res.render('./index/sign-in');
})

// ==============
// Login Logic
// ==============

// app.post('/login', middleware, callback)
app.post('/login', passport.authenticate(['freelancer', 'business', 'personal'], 
            {
               successRedirect: '/',
               failureRedirect: '/login'
            })
         );

// ==============
// Logout Route
// ==============

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

// ==============
// Secret Page(testing login)
// ==============

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret', {currentUser: req.user});
});




// ==============
// middleware
// ==============

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.use('/freelancer', freelancerRoutes);
app.use('/business', businessRoutes);
app.use('/personal', personalRoutes)
app.use('/services', serviceRoutes);

app.listen(process.env.PORT || 3000, function(){
    console.log("Drurri is running");
}); 

