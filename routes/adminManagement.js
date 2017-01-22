/**
 * Created by bharathula on 12/5/2016.
 */

var ejs = require("ejs");
var mysql = require('./DB/mysql');
var datetime = require('node-datetime');
var session = require('express-session');
var express = require('express');
var app = express();

exports.getLocationTypeChart = function(req,res){

    var admin = req.session.admin;
    var query = "select Sensor_type, Count(*) as count from sensor_details group by Sensor_type";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(admin!=null) {

                ejs.renderFile('./views/adminchartdemo.ejs',{data:results},function(err,result)
                {
                    if(!err)
                    {
                        res.end(result);
                        console.log(results[0].Sensor_type)
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


exports.getUsers = function(req,res){

    var admin = req.session.admin;
    var query = "select user_name,user_email from user_details";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(admin!=null) {

                ejs.renderFile('./views/showUserForAdmin.ejs',{data:results},function(err,result)
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

exports.getSensorPerHub = function(req,res){

    var admin = req.session.admin;
    var query = "select Sensor_name,hub_id Count(*) as count from sensor_details group by hub_id";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if(admin!=null) {

                ejs.renderFile('./views/admingetSensorPerHhub.ejs',{data:results},function(err,result)
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
