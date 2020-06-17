var express = require("express");

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/pricing", function(req, res){
    res.render("pricing");
});

app.get("/register", function(req, res){
    res.render("signup");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/services", function(req, res){
    res.render("services");
});

app.get("/photography", function(req, res){
    res.render("photography");
});

app.listen("3000", function(){
    console.log("WorkbitApp running");
});

