var ejs= require('ejs');
var mysql = require('mysql');


function getConnection(){
/*var connection = mysql.createConnection({
                host     : 'cmpe.cgje8hjr4ff1.us-west-2.rds.amazonaws.com',
                user     : 'cmpe',
                password : 'india123',
                database : 'mobilesensorcloud',
                port     : 3306
        });*/
	
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'vtamobilesensorclouddb',
		port	 : 3306
	});
return connection;
}

function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		
			if(err){
				console.log("ERROR: " + err.message);
			}
			else
			{	// return err or result
				console.log("DB Results:"+rows);
				callback(err, rows);
			}
	});
	console.log("Connection closed..");
	connection.end();
}

exports.fetchData=fetchData;
