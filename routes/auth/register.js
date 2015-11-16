var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');

var models  = require('../../models');

router.route('/')
    .post(function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        if(!username || !password || !email) {
            req.flash('error', 'Missing required fields');
            res.redirect('/register');
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                models.User.findOrCreate({where: {username: username}, defaults: {
                  hash: hash,
                  email: email
                }})
                .spread(function(user, created) {
                  if(created) {
                    passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                  })
                  } else {
                    req.flash('error', "Username or Email is already in use");
                    res.redirect('/register');
                  }
                }).catch(function(err) {
                  req.flash('error', "An unexpected error occured");
                  res.redirect('/register');
                });
            });
        });
    })
    .get(function(req, res) {
        res.render('register', { title: 'Register' , errors: req.flash('error') });
    });
module.exports = router;
