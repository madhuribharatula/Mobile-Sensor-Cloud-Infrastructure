/**
 * http://usejsdoc.org/
 */


var mysql = require('mysql');
var session = require('express-session');



exports.service = function(req, res){
	
  res.render('/userDashBoard');
};

exports.aa = function(req, res){
	
    var firstname = req.body.firstName;
    var email = req.body.email;
    var pwd = req.body.password;
  
	var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'vtamobilesensorclouddb',
        port	 : 3306
	});

	var insert = {
			user_name : firstname,
			user_email : email,
			user_password : pwd
	}
	

	connection.query("insert into user_details set ?", insert,
			function(err,result){
					if(err){
						console.log("unable to insert");
						return;
					}
					else{
						console.log("data inserted");
					}
	});
	connection.end();
	req.session.user=email;
	req.session.showData ='no';
	console.log(req.session.user);
	res.redirect('/userDashBoard');

};


    
    

	


