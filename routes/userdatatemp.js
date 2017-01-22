/**
 * http://usejsdoc.org/
 */
var mysql = require("mysql");
var session = require('express-session');

exports.addtempsensor = function(req, res){
	
	var name = req.session.user;
	
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : 'root',
		database : 'cloudusers'
	});
	var insert = {
			sensorid : "1",
			sensorname : "Temperature Sensor",
			Location : "California",
			sensordescription : "Temperature Sensor",
			usersname : name
	}
	
	
	
	connection.query('SELECT * FROM sensortable where sensorName =?',"Temperature Sensor", function(err, rows, fields){
		if(err)
		{
			console.log("error while performing query");
		}
		else if (rows.length == 0)
		{
		connection.query("insert into sensortable set ?", insert,
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
		console.log("Sensor already being used");
		
		res.redirect('/seesensors');
		}
	else
		{
		
	    res.render('userdata', {items: rows , username: name});

		}
});
}	
	
