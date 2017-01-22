var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:3000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing event into DynamoDB. Please wait.");

var eventData = JSON.parse(fs.readFileSync('EventData.json', 'utf8'));
eventData.forEach(function(event) {
    var params = {
        TableName: "FinalTable",
        Item: {
            "sensedtime":  event.sensedtime,
            "entity_locationId": event.entity_locationId,
            "current_status":  event.current_status
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Event", event.entity_locationId, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", event.entity_locationId);
        }
    });
});/**
 * Created by bharathula on 11/30/2016.
 */
