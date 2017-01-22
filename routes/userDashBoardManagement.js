/**
 * Created by bharathula on 12/5/2016.
 */

var ejs = require("ejs");
var mysql = require('./DB/mysql');
var datetime = require('node-datetime');
var session = require('express-session');
var express = require('express');
var app = express();



exports.dataPerStatus = function(req,res) {

    var user = req.session.user;
    var query = "select count(*) as count,sd.sensor_status as sensor_status from sensor_details sd where sd.user_email='"+user +"' group by sd.sensor_status";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(user!=null) {

                ejs.renderFile('./views/userDashboard.ejs',{data:results},function(err,result)
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

exports.dataPerLocation = function(req,res) {

    var user = req.session.user;
    var query = "select count(*) as count,sd.sensor_location as sensor_location from sensor_details sd where sd.user_email='"+user +"' group by sd.sensor_location";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(user!=null) {

                ejs.renderFile('./views/userDashboard.ejs',{dataperLoc:results},function(err,result)
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