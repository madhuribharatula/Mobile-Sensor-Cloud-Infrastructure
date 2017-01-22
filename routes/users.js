/**
 * Created by bharathula on 11/17/2016.
 */
var ejs = require("ejs");
var mysql = require('./DB/mysql');
exports.addsensor = function(req,res){

    var name = req.body.name;
    var location = req.body.location;
    var type = req.body.type;
    var userid = req.session.userid;

    var query = "INSERT INTO sensor_allocation (User_id, sensorname, sensorlocation, sensortype) VALUES ('" + userid + "','" + name + "','" + location + "','" + type + "')";


    mysql.fetchData(function(err, results){
        console.log("in fetch data");
        if (err) {
            throw err;
        }
        else {

            console.log("data inserted");
            res.end();
            if (results.length > 0) {
                console.log("data inserted in IF");
                res.end();
            }
        }
    }, query);
};

exports.getsensors = function(req,res){

    var userid = req.session.userid;
    var query = "Select * from sensor_allocation where User_id = '" + userid + "'";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if (results.length > 0) {

                console.log("getusers names");
                console.log(JSON.stringify( results));
                //res.end(JSON.stringify(results));
                ejs.renderFile('./views/manageSensor.ejs',{data:results},function(err,result)
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


exports.removesensor = function(req,res){

    var sensorid = req.body.sensorid;

    var query = "Delete from sensor_allocation where User_id = '" + 'Madhuri' + "' and Sensor_id = '" + sensorid +"'";

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.sensorid));

    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            console.log("sensor deleted inserted");
            res.end();
            if (results.length > 0) {
                console.log("data inserted");
                res.end();
            }
        }

    }, query);
};

