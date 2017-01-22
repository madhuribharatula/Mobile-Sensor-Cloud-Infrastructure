var ejs = require("ejs");
var mysql = require('./DB/mysql');


exports.signin = function(req,res){
console.log("sdfsdfdsf");

    var landingPage;
	var usertype=req.param('usertype');
	var email = req.param('email') ;
	var user = 'User';
	var query = "select * from vtasensor.user_details where user_email='"+email+"' and user_password='"+req.param('password')+"' ";
	console.log("Query is:"+query);
	landingPage='userDashboard.ejs';
	// if(usertype=='Vendor')
     //    landingPage='vendorDashboard.ejs';
	// else if(usertype.equals('User'))
     //    landingPage='userDashboard.ejs';
	// else
     //    landingPage='adminDashboard.ejs';

	mysql.fetchData(function(err, results){

		if (err) {
			throw err;
		}
		else {
			if (results.length > 0) {
				req.session.userid=results[0].user_id;
				console.log(JSON.stringify( results));
				ejs.renderFile('./views/'+landingPage,{data:results},function(err,result)
				{
					if(!err)
						{
							res.end(result);
						}
					else
						{
						res.end('An error occured');
						console.log(err);
						}
				});
			}
			else
				{
				console.log("Invalid login");
				ejs.renderFile('./views/failure.ejs',function(err,result)
				{
					if(!err)
						{
							res.end(result);
						}
					else
						{
							res.end('An error occured');
							console.log('An error occured');
						}
				});
				}
		}

	}, query);


};