/**
 * Created by bharathula on 11/30/2016.
 */

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing event into DynamoDB. Please wait.");

var eventData = JSON.parse(fs.readFileSync('SensorData.json', 'utf8'));
eventData.forEach(function(event) {
    var params = {
        TableName: "DynamoSensorTable",
        Item: {
            "Sensed_at":  event.Sensed_at,
            "Sensor_id": event.Sensor_id,
            "details":  event.details,
            "station_id":  event.station_id
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Event", event.station_id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", event.station_id);
        }
    });
});/**
 * Created by bharathula on 11/30/2016.
 */

