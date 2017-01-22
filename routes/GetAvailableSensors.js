/**
 * Created by bharathula on 11/30/2016.
 */

var ejs = require("ejs");
var mysql = require('./DB/mysql');
var AWS = require("aws-sdk");
var HashMap = require('hashmap');
var session = require('express-session');
AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAJWC2LRE3JHQEVNXQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

exports.getsensors = function(req,res){

    var userid = req.session.user;
    var query = "Select * from sensor_details where user_email = '" + userid + "'";


    mysql.fetchData(function(err, results){

        if (err) {
            throw err;
        }
        else {

            if (results.length > 0) {

                ejs.renderFile('./views/GoogleMapData.ejs',{data:results},function(err,result)
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
                console.log("No available sensors login");
                ejs.renderFile('./views/NosensorAvailable.ejs',{data:results},function(err,result)
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

// get the sensor data to show as graphs from dynamo db

exports.getSensorData = function(req,res) {
    var sensor_id = req.param('selectedSensor');
    var selected_date = req.param('selectedDate');
    var from = new Date(selected_date);
    var to = new Date(selected_date);

    from.setDate(to.getDate() - 5);
   // console.log(selected_date.getTime());
    console.log(to);
    console.log(from.getTime());
    var items = [];

    querydata(sensor_id, from, to, function (err, result) {
        if (err) {
            console.info(err);
        } else {
            //console.log(result);

        }
    });
};

    function querydata(sensor_id,from,to,callback) {

        var docClient = new AWS.DynamoDB.DocumentClient();
        var to=1480137789410;
        var from=1480137782912;

        var params = {
            TableName: "DynamoSensorTable",
            KeyConditionExpression: "#Sensor_id =:elocation AND #Sensed_at BETWEEN :from AND :to",
            ExpressionAttributeNames: {
                "#Sensed_at": "Sensed_at",
                "#Sensor_id": "Sensor_id"
            },
            ExpressionAttributeValues: {
                //":from": Math.round(from.getTime()/1000),
               // ":to": Math.round(to.getTime()/1000),
                ":from":from,
                ":to":to,
                ":elocation": sensor_id
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
              var  items = [];
              items  = items.concat(data.Items);
                console.log("data is");
                console.log(data);
                if (items.length > 0) {
                    ejs.renderFile('./views/'+dynamoBasedDashBoard,{data:items},function(err,result){

                        if (!err) {
                            res.end(items);
                        }
                        else {
                            res.end('An error occured');
                            console.log(err);
                        }
                    });
                }
                else{
                    console.log("Invalid login");
                    ejs.renderFile('./views/signin.ejs',function(err,result)
                    {

                    });
                }
            }
        });
    }

exports.scanSensorData = function(req,res) {
    var email = req.session.user;
    var query = "Select * from sensor_details where user_email = '" + email + "'";


    mysql.fetchData(function(err, results) {

        if (err) {
            throw err;
        }
        else {

            if (results.length > 0) {


                querydata(function (err, result) {
                    if (err) {
                        console.info(err);
                    } else {
                        console.log(result);

                    }
                });
            }
            else{

            }
        }
    },query);
    function querydata(callback) {

        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Event_table",
            ProjectionExpression: "entity_location,current_status",

        };

        console.log("Scanning table.");
        docClient.scan(params, function (err, data)
        {


            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Scan succeeded." + data);
                var items = [];
                var stations=[];
                var pass = [];
                var map = new HashMap();
                var countmap = new HashMap();
                items = items.concat(data.Items);
                for(var i=0;i<items.length;i++) {

                    if (map.has(items[i].entity_location)) {
                        var val = parseInt(map.get(items[i].entity_location)) + parseInt(items[i].current_status);
                        map.set(items[i].entity_location, val);
                        countmap.set(items[i].entity_location, countmap.get(items[i].entity_location)+1);

                    }
                    else {
                        map.set(items[i].entity_location, parseInt(items[i].current_status));
                        countmap.set(items[i].entity_location, 1);
                    }
                }
                map.forEach(function(value, key) {
                    console.log(countmap.get(key));
                    var status = parseInt(value/(countmap.get(key)));
                    console.log("valueis "+ value);
                    console.log("status "+ status);
                    pass.push(status);
                    stations.push(key);
                });
                console.log(items);
                var landingPage = "dynoSample.ejs";
                if (items.length > 0) {
                    ejs.renderFile('./views/dynoSample.ejs',{stations:stations,number:pass},function(err,result)
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
                else {
                    console.log("Invalid login");
                    ejs.renderFile('./views/index.ejs', function (err, result) {

                    });
                }
            }
        });
    }

};




















