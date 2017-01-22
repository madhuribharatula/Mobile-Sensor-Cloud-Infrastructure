var mysql = require("mysql");
var session = require('express-session');
var DateDiff = require('date-diff');

exports.billing = function(req, res){
	var name = req.session.user;
	var date = new Date(); 
	 var diff;
 var t=[];
 var n=0;

	var connection = mysql.createConnection({
		host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'vtamobilesensorclouddb',
		port	 : 3306
	});
	connection.query('SELECT * FROM billing where user_email =? order by cdate desc',name, function(err, rows, fields){
		if(err)
		{
			console.log("error while performing query");
		}
		else
		{
			
	          valueBydate = {}
	          for(var i=0;i<rows.length;i++){
	          	var d = new Date(rows[i].cdate);
				var dater = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	          	if(valueBydate[dater] != undefined){
	          		valueBydate[dater].push(rows[i]);
	          	}else{
	          		valueBydate[dater] = [];
	          		valueBydate[dater].push(rows[i]);

	          	}
	          }
	           for (var key in valueBydate)
	           {
	           	for (var ob in valueBydate[key])
	           	{
	           		n+=valueBydate[key][ob].amount;     	           	
	           	}
	           	t.push(n);
	           	n=0;
	           }
	           
					    res.render('billing', {values:valueBydate,totalamount:t});

		}
});
	


connection.end();
};
