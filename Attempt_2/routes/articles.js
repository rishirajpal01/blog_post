const express = require("express");
const article = require("../models/article.js");
const router = express.Router();

let Article = require("../models/article.js");
let User = require("../models/user.js")

// access control
function ifAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        req.flash('danger', "Please login!");
        res.redirect('/users/login');
    }
}

// routing
router.get("/add", ifAuthenticated, (req, res) => {
    res.render("add_article", {
        title: "Add article",
    })
})

// get single blog
router.get("/:id", (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        User.findById(article.author, (err, user) => {
            res.render("article", {
                article: article,
                author: user.name
            })
        })
        
    })
})

// Edit blog page
router.get("/edit/:id", ifAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (article.author != req.user._id) {
            req.flash('danger', "Not authorized!");  // doesnt work
            res.redirect("/");
        }
        res.render("edit_article", {
            title: "Edit Blog",
            article: article 
        })
    })
})

// Add blog
router.post("/add", (req, res) => {
    req.checkBody("title", "Title is required").notEmpty();
    //req.checkBody("author", "Author is required").notEmpty();
    req.checkBody("body", "Body is required").notEmpty();

    // get errors
    let errors = req.validationErrors();
    if (errors) {
        res.render("add_article", {
            title: "Add article",
            errors: errors
        });
    }
    else {
        let article = new Article();
        article.title = req.body.title;
        // article.author = req.body.author;
        article.author = req.user._id;
        article.body = req.body.body;

        article.save((err) => {
            if (err){
                console.log(err);
                return;
            }
            else{
                req.flash("success", "Blog Added");
                res.redirect("/");
            }
        });
    }

    
})

// Edit blog
router.post("/edit/:id", (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id: req.params.id}

    Article.updateOne(query, article, (err) => {
        if (err){
            console.log(err);
            return;
        }
        else{
            res.redirect("/");
        }
    });
})

//delete blog 
router.delete("/:id", (req, res) => {
    if (!req.user._id){
        res.status(500).send();
    }
    let query = {_id: req.params.id};

    Article.findById(req.params.id, (err, article) => {
        if (article.author != req.user._id){
            res.status(500).send();
        }
        else{
            Article.deleteOne(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send("Success");
            })
        }
    });
});

module.exports = router;