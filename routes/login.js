var mysql = require("mysql");
var session = require('express-session');

exports.login = function(req, res){
    res.render('login', { title: '' });

};

exports.adminlogin = function(req, res){
    res.render('adminLogin', { title: '' });

};

exports.authenticate = function(req, res){

    var email = req.body.email;
    var pwd = req.body.password;


    var logininfo = {
        emailid : email,
    }


    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'vtamobilesensorclouddb',
        port	 : 3306
    });

var query = "select * from user_details where user_email='"+email+"' and user_password='"+pwd+"' ";
console.log(query);
    connection.query(query, function(err, rows, fields){
        if(err)
        {
            console.log("error while performing query");
//				res.render('login',{title : "Invalid Email Id"} );
        }
        if (rows.length == 0)
        {
            res.render('login',{title : "Invalid Email Id"} );
        }
        else
        {

            if(pwd == rows[0].user_password)
            {
                req.session.user= rows[0].user_email;
                console.log(rows[0].user_email);
                //     var query2 = "select * from sensor_details where user_email = ' "+email+" '";
                //     connection.query(query2, function(err, rows, fields){
                //     if(err)
                //     {
                //         console.log("Error while prforming the query to get the sensors");
                //     }
                //     if(result.length == 0)
                //     {
                //         req.session.showData ='no';
                //     }
                //     else{
                //         req.session.showData ='yes';
                //     }
                //
                // });
                res.redirect('/userDashboard');
            }
            else
            {
                res.render('login',{title : "Invalid Password"} );
            }
        }
    });



    connection.end();



};

exports.adminCheck = function(req, res){

    var email = req.body.email;
    var pwd = req.body.password;


    var logininfo = {
        emailid : email,
    }


    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'vtamobilesensorclouddb',
        port	 : 3306
    });

    var query = "select * from admin_details where admin_email='"+email+"' and admin_password='"+pwd+"' ";
    console.log(query);
    connection.query(query, function(err, rows, fields){
        if(err)
        {
            console.log("error while performing query");
//				res.render('login',{title : "Invalid Email Id"} );
        }
        if (rows.length == 0)
        {
            res.render('adminlogin',{title : "Invalid Email Id"} );
        }
        else
        {

            if(pwd == rows[0].admin_password)
            {
                req.session.admin= rows[0].admin_email;
                console.log(rows[0].admin_email);
                res.redirect('/adminDashboard');
            }
            else
            {
                res.render('adminlogin',{title : "Invalid Password"} );
            }
        }
    });



    connection.end();



};