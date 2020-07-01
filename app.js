var express       = require("express"),
    app           = express(),
    packageRoutes = require('./routes/packages'),
    serviceRoutes = require('./routes/services')


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    res.render("landing");
});


// RegisterPage

app.get("/register", function(req, res){
    res.render("signup");
});

// About Page

app.get("/about", function(req, res){
    res.render("about");
});


app.use('/packages', packageRoutes);
app.use('/services', serviceRoutes);

app.listen("3000", function(){
    console.log("WorkbitApp running");
});

