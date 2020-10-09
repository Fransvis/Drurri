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
* save 2.4.0

# Launch
* Require all packages and set app to use express for your  routes
<img src='/public/stylesheets/imgs/packages.png'> 

* create a route (below is a simple landing page)
<img src='/public/stylesheets/imgs/landing.png'>

* Create a database (local or cloud based) and connect to it
<img src='/public/stylesheets/imgs/database.png'>

* Setup PORT address

<img src='/public/stylesheets/imgs/port.png'>

* (In your terminal) Run with command : node app.js

# Further usage

* Create a public directory file to hold your stylesheets, images, scripts and more
* Set your app to use a static method on the public directory

<img src='/public/stylesheets/imgs/public.png'>
<img src='/public/stylesheets/imgs/static.png'>

* Set your app to use method-override in order to update or delete items from your database

<img src='/public/stylesheets/imgs/methodoverride.png'>

* Set your view engine to use ejs (this allows you to render an external folder)


<img src='/public/stylesheets/imgs/methodoverride.png'>

* Set up an express session and choose secret key to store those sessions  

<img src='/public/stylesheets/imgs/session.png'>

* You can also create models for an object(such as a customer) and simply create a localStrategy based on the model

<img src='/public/stylesheets/imgs/passport.png'>

