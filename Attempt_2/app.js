const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database.js")

// MongoDB connection setup 
// mongoose.connect("mongodb://localhost/blogdb");
mongoose.connect(config.database);
let db = mongoose.connection;
db.on("open", () => {
    console.log("Connected to mongoDB :)");
})
db.on("error", (err) => {
    console.log(err);
})

// initilising app
const app = express();

// importing blog model
let Article = require("./models/article.js");

// load view engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser Middleware 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




// Public folder config
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator middlewareapp
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

// passport config
require("./config/passport.js")(passport);
// Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
    res.locals.user = req.user || null;
    next(); 
})

app.get("/", (req, res) => {
    // res.send("Server sending response!");
    Article.find({}, (err, articles) => {
        if (err){
            console.log(err);
        }
        else{
            res.render("index", {
                title: "Articles",
                articles: articles
            })
        }
        
    });
    
})

// route file
let articles = require("./routes/articles.js");
let users = require("./routes/users.js");
app.use("/article", articles);
app.use("/users", users);


// server listening
app.listen(3000, () => {
    console.log("Server runing on localhost:3000")
});