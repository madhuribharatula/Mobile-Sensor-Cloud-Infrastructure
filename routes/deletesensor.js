/**
 * http://usejsdoc.org/
 */
var mysql = require("mysql");
var session = require('express-session');

exports.deletesensor = function(req, res){
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
		{	console.log(rows[0].sensorName);
			if(rows[0].sensorName == "Temperature Sensor")
			{
				var connection2 = mysql.createConnection({
					host : '127.0.0.1',
					user : 'root',
					password : 'root',
					database : 'cloudusers'
				});
				connection2.query('DELETE FROM sensortable WHERE sensorName = ? and usersname = ?',["Temperature Sensor", name], function(err, rows,fields){
					if(err)
					{
						console.log("error while performing temperature delete query");
					}
					else {
						res.redirect('/seesensors');
					}
				});
			}
			else if (rows[0].sensorName == "GPS Sensor")
			{
				var connection3 = mysql.createConnection({
					host : '127.0.0.1',
					user : 'root',
					password : 'root',
					database : 'cloudusers'
				});
				connection3.query('DELETE FROM sensortable WHERE sensorName = ? and usersname = ?',["GPS Sensor",name], function(err, rows,fields){
					if(err)
					{
						console.log("error while performing gps delete query");
					}
					else
					{
						res.redirect('/seesensors');
					}
				});
			}

		}
});
connection.end();
};