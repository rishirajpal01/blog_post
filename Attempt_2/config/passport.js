const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.js");
const config = require("../config/database.js")
const bcrypt = require("bcryptjs");
const { findOne } = require("../models/user.js");

module.exports = (passport) => {
    passport.use(new LocalStrategy ((username, password, done) => {
        // match username
        let query = {username: username};
        User.findOne(query, (err, user) => {
            if (err){
                throw err;
            }
            if (!user){
                return done(null, false, {message: "No user found"});
            }

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Wrong Password"});
                }
            })

        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
      
    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });
}

