var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')
    .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true  }),
        function(req, res) {
            res.redirect('/');
        }
    )
    .get(function(req, res) {
        res.render('login', { title: 'Login', errors: req.flash('error')});
    });

module.exports = router;