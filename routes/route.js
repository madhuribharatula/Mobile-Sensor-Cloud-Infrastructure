/**
 * Created by bharathula on 11/17/2016.
 */

//var _GLOBAL = require('../global');
var express = require('express');
var app = express();
var request = require('request'); // handle HTTP requests

// Default route
app.get('/', function(req, res, next) {
    res.redirect('/index');
});

app.get('/logout', function(req, res, next) {
    // clear session
    req.session.destroy();
    res.redirect('/index');
});

app.get('/index', function(req, res, next) {
    var sess = req.session;
    // check if session exists
    // navigate to dashboard if user is already logged in
    if (sess.account && sess.email) {
        res.redirect('/' + sess.account);
        return;
    }

    // clear session
    sess.destroy();
    res.render('login', {
        render: {
            title: 'Login',
            page: 'signin',
            alert: (sess.login_error ? sess.login_error : null)
        }
    });
});

module.exports = app;


