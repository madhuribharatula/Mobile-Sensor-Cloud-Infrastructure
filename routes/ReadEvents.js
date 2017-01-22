// /**
//  * Created by bharathula on 11/30/2016.
//  */
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
//
// var mysql = require('mysql');
// var app = express();
//
// var AWS = require("aws-sdk");
// var _ = require('underscore');
// var dateFormat = require('dateformat');
// var app = express();
//
//
// AWS.config.update({
//     region: "us-west-2",
//     endpoint: "http://localhost:3000"
// });
//
//     var timer = setInterval(function() {
//         var from = new Date();
//         from.setDate(from.getDate()-5);
//         var items = [];
//         var to = new Date();
//         to.setDate(from.getDate()+1);
//
// querydata(from ,to,function(err,result) {
//     if(err) {
//         console.info(err);
//     } else {
//         console.log(items);
//
//     }
// });
//
// function querydata(from,to,callback) {
//
//     var docClient = new AWS.DynamoDB.DocumentClient();
//
//     var params = {
//         TableName:"SensordataTable",
//         KeyConditionExpression:"#entity_locationId =:elocation AND #sensedtime BETWEEN :from AND :to",
//         ExpressionAttributeNames: {
//             "#sensedtime":"sensedtime",
//             "#entity_locationId": "entity_locationId"
//         },
//         ExpressionAttributeValues: {
//             ":from": from.getTime(),
//             ":to":to.getTime(),
//             ":elocation": "train2"
//         }
//     };
//     docClient.query(params, function(err, data) {
//         if (err) {
//             console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("Query succeeded.");
//         }
//     });
//
//
//     var queryExecute = function(callback) {
//
//         docClient.query(params,function(err,result) {
//
//             var array1 = [];
//             var array2 = [];
//             var numRows = result.length;
//             if(err) {
//                 callback(err);
//             } else {
//
//                 console.log(result)
//                 _.each(result, function (one) {
//                  array1.push(dateFormat(one.sensedtime, "fullDate"));
//                  array2.push(one.current_status);
//                 });
//                 socket.emit('dynochart_data', {
//                     array1: array1,
//                     array2: array2
//                 });
//
//
//                 items = items.concat(result.Items);
//                 if(result.LastEvaluatedKey) {
//
//                     params.ExclusiveStartKey = result.LastEvaluatedKey;
//                     queryExecute(callback);
//                 } else {
//                     callback(err,items);
//                 }
//             }
//         });
//     }
//
//     queryExecute(callback);
// };
//     }, 5000);
//
