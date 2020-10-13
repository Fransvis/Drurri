# DRURRI
* Drurri connects businesses and freelancers by providing a variety of packages. 
* These packages give businesses access to services based on the package they have chosen.

# Technologies included
* Bootstrap 4.4.1
* Font-awesome
* nodejs v12.18.0 - be sure to install node.js on whichever system you are running

# npm packages installed
* body-parser 1.19.0
* ejs 3.1.5
* express 4.17.1
* express-session 1.17.1
* git 0.1.5
* method-override 3.0.0
* mongodb 3.6.2
* mongoose 5.10.7
* multer 1.4.2
* passport 0.4.1
* passport-local 1.0.0
* passport-local-mongoose" 6.0.1

# Launch

* Be sure to install nodejs on your system(https://nodejs.org/en/download/)

1. Run command: `npm init` and set up your project (you can choose your own starting point. This project's starting point is declared as: app.js)

2. Require all packages and set app to use express for your routes

```javascript
var express           = require("express"),
app                   = express(),
mongoose              = require("mongoose"),
session               = require('express-session'),
bodyParser            = require('body-parser'),
passport              = require('passport'),
LocalStrategy         = require('passport-local'),
methodOverride        = require('method-override'),
passportLocalMongoose = require('passport-local-mongoose'),
```

3. Create a starting route (usually a simple landing page)

``` javascript
app.get("/", function(req, res){
	res.render("landing");
});
```

4. Create a database (local or cloud based) and connect to it
``` Javascript
mongoose.connect('mongodb://localhost:27017/<yourdatabasename>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

5. Set up PORT address
```Javascript
app.listen(process.env.PORT || 5000, function(){
	console.log("Server is running");
});
```

6.  Run with command `node app.js` or with the starting point that you specified in your npm init setup


* Alternatively you can simply pull this entire project and run it in your terminal with the command:
 `node app.js` (remember to have nodejs installed on your system - https://nodejs.org/en/download/)

# Further usage

* Create a public directory file to hold your stylesheets, images, scripts and more
* Set your app to use a static method on the public directory

<img src='/public/stylesheets/imgs/public.png'>

`app.use(express.static(__dirname + "/public"))`

* Set your app to use method-override in order to update or delete items from your database

`app.use(methodOverride('_method'))`

* Set your view engine to use ejs (this allows you to render an external html folder with embededed Javascript - https://ejs.co/)

`app.set("view engine", "ejs");`

* Set up an express session and choose a secret key to store those sessions  

```JavaScript
app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 5400000 },
  }));
  ```

* You can also create models for an object(such as a customer) and simply create a localStrategy based on the model

```Javascript
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy('<yourstrategyname>', <'yourmodelname'>.authenticate()));
passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
  });

```

* a simple example of a userModel that you might use

```Javascript
var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var UserSchema = new Schema (
        {
          firstName: String,
          lastName: String,
          username: String,
          password: String
        }
      )

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
```

