
/**
 * Created by bharathula on 11/17/2016.
 */
var ejs = require("ejs");
var mysql = require('./DB/mysql');
var datetime = require('node-datetime');
var session = require('express-session');
var express = require('express');
var app = express();

exports.addsensor = function(req,res){

    var userid = req.session.user;
    var type = req.body.selectedSensor;
    var SensorName = req.body.sensorName;
    var location ;
    var desc= req.body.sensordesc;
    var selectedHub = req.body.selectedHub;
    var status = 'Active';


    if(userid!=null) {
        var query1 = "select * from sensor_hub where hub_id='"+ selectedHub+"'";
        mysql.fetchData(function (err, results) {
            console.log("in fetch data");
            if (err) {
                throw err;
            }
            else {

                location = results[0].hub_location;
                console.log(results[0].hub_location+ location);
            }

            var query = "INSERT INTO sensor_details (user_email,hub_id, Sensor_name, Sensor_Location, Sensor_type,Sensor_description,Sensor_status) VALUES " +
                "('" + userid + "','" + selectedHub + "','"+  SensorName + "','" + location + "','" + type + "','" + desc + "','"+ status+"')";

            mysql.fetchData(function (err, results) {
                console.log("in fetch data");
                if (err) {
                    throw err;
                }
                else {

                    console.log("data inserted");
                    res.redirect('/ManageSensor');

                    // ejs.renderFile('./views/manageSensor.ejs',{data:results},function(err,result)
                    // {
                    //     if(!err)
                    //     {
                    //         res.end(result);
                    //     }
                    //     else
                    //     {
                    //         res.end('An error occured');
                    //         console.log(err);
                    //     }
                    // });
                }

            }, query);

        }, query1);


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

exports.getsensors = function(req,res){

    var userid = req.session.user;
    var status = 'Terminated';
    var query = "Select * from sensor_details where user_email = '" + userid + "' AND Sensor_status!='"+ status+"'";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(userid!=null) {


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


exports.deleteSensor = function(req,res){

    var sensorid = req.body.sensorid;
    var userid = req.session.user;
    var status = 'Terminated';

    var query = "UPDATE sensor_details  SET Sensor_status ='" + status + "',"+ "terminated_date = NOW()"+
        " WHERE Sensor_ID= '" + sensorid + "' AND user_email ='" + userid + "'" ;

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.sensorid));

    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            console.log("sensor deleted ");
            res.redirect('/ManageSensor');
        }

    }, query);
};


exports.gethubList = function(req,res){

    var userid = req.session.user;
    var query = "Select * from sensor_hub where user_email='"+ userid+"'" ;


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            ejs.renderFile('./views/addSensor.ejs',{data:results},function(err,result)
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



exports.startSensor = function(req,res){

    var userid = req.session.user;
    var sensorid = req.body.sensorid;
    var status = 'Active';

    if(userid!=null) {
        var query = "UPDATE sensor_details  SET Sensor_status ='" + status + "',"+ "restart_date = NOW()"+
        " WHERE Sensor_ID= '" + sensorid + "' AND user_email ='" + userid + "'" ;
        mysql.fetchData(function (err, results) {
            console.log("in fetch data");
            if (err) {
                throw err;
            }
            else {

                console.log("data inserted");
                res.redirect('/ManageSensor');

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

exports.stopSensor = function(req,res){

    var userid = req.session.user;
    var sensorid = req.body.sensorid;
    var status = 'In Active';
      if(userid!=null) {
          var query = "UPDATE sensor_details  SET Sensor_status ='" + status + "',"+ "stop_date = NOW()" +
            " WHERE Sensor_ID= '" + sensorid + "' AND user_email ='" + userid + "'" ;
        mysql.fetchData(function (err, results) {
            console.log("in fetch data");
            if (err) {
                throw err;
            }
            else {

                console.log("data inserted");
                res.redirect('/ManageSensor');
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
