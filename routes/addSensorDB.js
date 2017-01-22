/**
 * Created by bharathula on 12/3/2016.
 */

var ejs = require("ejs");
var mysql = require('./DB/mysql');
exports.addsensor = function(req,res){

    var userid = req.session.user;
    var type = req.body.selectedSensor;
    var SensorName = req.body.sensorName;
    var location = req.body.sensorLocation;
    var desc= req.body.sensordesc;
    var status = 'Active';

    if(userid!=null) {
        var query = "INSERT INTO sensor_details (user_email, Sensor_name, Sensor_Location, Sensor_type,Sensor_description,Sensor_status) VALUES ('" + userid + "','" + SensorName + "','" + location + "','" + type + "','" + desc + "','"  +  "','" + status+"')";

        mysql.fetchData(function (err, results) {
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
};
