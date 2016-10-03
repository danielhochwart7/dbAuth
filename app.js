var User = require("./controllers/user-controller.js");

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = module.exports = express();

/* ========================================== */
/* Passport strategy and other configurations */
/* ========================================== */
var passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.checkOnExistence({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
/* ========================================== */


app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

app.post('/login',
         passport.authenticate('local', { failureRedirect: '/' }),
         function(req, res) { res.redirect('/views/authenticated.html');}
);

app.listen(3000);
