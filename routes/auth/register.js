var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var file = "test.sqlite";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

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
                createUser(username, hash, email, function (err, insertedID) {
                    if(err) {
                        req.flash('error', err.message);
                        res.redirect('/register')
                    }
                    else {
                        getUser(insertedID, function (err, user) {
                            if(err) {
                                res.redirect('/register')
                            } else {
                                req.login(user, function (err) {
                                    if(!err){
                                        res.redirect('/');
                                    }else{
                                        res.redirect('/register')
                                    }
                                })
                            }
                        });
                    }
                })
            });
        });
    })
    .get(function(req, res) {
        res.render('register', { title: 'Register' , errors: req.flash('error') });
    });

function createUser(username, hash, email, callback) {
    db.run("INSERT into users (username, hash, email) values (? , ?,  ?)", [username, hash, email], function(err){
        if(err) {
            //constraint violation
            if (err.errno == 19) {
                return callback({message : "Username or Email is already in use"})
            }
            return callback(err)
        } else {
            return callback(null, this.lastID);
        }

    });
}

function getUser(id, callback) {
    db.get("SELECT user_id, username, email, user_level from users where user_id = ?", [id], function(err, user){
        if(err) {
            return callback(err);
        } else {
            return callback(null, user)
        }
    });
}

module.exports = router;