var mysql = require("mysql");
// var session = require('express-session');
var DateDiff = require('date-diff');
var connection = mysql.createConnection({
		host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'vtamobilesensorclouddb',
			});
	var result=[];
	connection.query('SELECT * FROM sensor_details ', function(err, rows, fields){
      if(err){
      	                						console.log(err);
						console.log("unable to get");
						return;
					}
					else{
												setValue(rows);
						connection.end();
					}
	});
  function setValue(value) {
  	  result = value;
  for(var i=0;i<result.length;i++)
			{
				if(result[i].Sensor_status=="Active")
			{
			diff = new DateDiff(new Date(), result[i].allocation_date);
			if(diff.hours()<=24)
				var hour=diff.hours();
			else 
				var hour=24;
			var insert = 
			{
		   	Sensor_ID : result[i].Sensor_ID,
			user_email : result[i].user_email,
			cdate:new Date(),
			amount:hour*0.50,
			hours:hour

	        }
	       	connection.query("insert into billing set ?", insert,
			function(err,result){
									if(err){
						console.log(err);
						console.log("unable to insert");
						return;
					}
					else{
						console.log("data inserted");
					}
					//connection.end();
	});
  
   }
}
}
