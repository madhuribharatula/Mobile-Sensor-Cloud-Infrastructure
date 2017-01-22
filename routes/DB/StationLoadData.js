var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing station into DynamoDB. Please wait.");

var eventData = JSON.parse(fs.readFileSync('stationJson.json', 'utf8'));
eventData.forEach(function(event) {
    var params = {
        TableName: "station_details1",
        Item: {
            "station_id":  event.station_id,
            "latitude": event.latitude,
            "longitude":  event.longitude,
            "createdTime" : event.createdTime
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Event", event.station_id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", event.station_id);
        }
    });
});