var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models  = require('../models');

var strategy = new LocalStrategy(
    function(username, password, done) {
        getUser(username, password, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message: 'Incorrect username or password'}); }
            if (!user.correctPassword) { return done(null, false, {message: 'Incorrect username or password'}); }
            return done(null, user);
        });
    }
);

function getUser(username, password, callback) {
  models.User.findOne({where : {username : username}}).then(function (user) {
    if (!user) {
        return callback(null, user)
    }
    bcrypt.compare(password, user.hash, function(err, res) {
        user.correctPassword = res;
        return callback(null, user)
    });
  });
}

module.exports = strategy;
