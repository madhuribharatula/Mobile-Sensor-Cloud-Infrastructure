var mysql = require("mysql");
var session = require('express-session');


exports.seesonsors = function(req, res){
	var name = req.session.user;
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : 'root',
		database : 'cloudusers'
	});
	connection.query('SELECT * FROM sensortable where usersname =?',name, function(err, rows, fields){
		if(err)
		{
			console.log("error while performing query");
		}
		else if (rows.length == 0)
		{
		res.render('userdata',{title : "No Sensors are Being Used" ,username :name, items: rows} );
		}
	    else
		{
		
	    res.render('userdata', {items: rows, username :name });

		}
});
connection.end();
};