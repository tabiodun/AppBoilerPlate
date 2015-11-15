var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

var file = "test.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

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
    db.get("SELECT user_id, username, email, user_level, hash  from users where username = ?", [username], function(err, user){
        if(err) {
            return callback(err);
        }
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