/**
 * Created by bharathula on 12/4/2016.
 */
var ejs = require("ejs");
var mysql = require('./DB/mysql');
var datetime = require('node-datetime');
var session = require('express-session');




exports.addhub = function(req,res){

    var userid = req.session.user;
    var hubname = req.body.sensorhubName;
    var sensorhubLocation = req.body.sensorhubLocation;
    if(userid!=null) {
        var query = "INSERT INTO sensor_hub (hub_name, user_email,hub_location) VALUES " +
            "('" + hubname + "','" + userid + "','" + sensorhubLocation + "')";

        mysql.fetchData(function (err, results) {
            console.log("in fetch data");
            if (err) {
                throw err;
            }
            else {

                res.redirect('/ManageSensorHub');

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

exports.gethubDetails = function(req,res){

    var userid = req.session.user;
    var query = "Select * from sensor_hub sh where  sh.user_email ='"+ userid +"'";

    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {
            console.log("getusers names");
            console.log(JSON.stringify( results));
            ejs.renderFile('./views/viewSensorHubs.ejs',{data:results},function(err,result)
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

    }, query);
};

exports.getsensorsinHub = function(req,res){

    var userid = req.session.user;
    var hubid = req.body.hubid;
    var query = "Select * from sensor_details where user_email = '" + userid + "' and hub_id = '"+ hubid+"'";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(userid!=null) {

                console.log("getusers names");
                console.log(JSON.stringify( results));

                ejs.renderFile('./views/ViewSensorinHub.ejs',{data:results},function(err,result)
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

            else{
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

exports.deleteSensorhub = function(req,res){

    var hubid = req.body.hubid;
    var userid = req.session.user;
    var sensor =[];


   var query = "Delete from sensor_hub where user_email = '" + userid + "' and hub_id = '" + hubid +"'";

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.sensorid));

    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {
            res.redirect('/ManageSensorHub');
        }

    }, query);
};


