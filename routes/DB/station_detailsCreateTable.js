/**
 * Created by bharathula on 11/30/2016.
 */
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "station_details1",
    KeySchema: [
        { AttributeName: "station_id", KeyType: "HASH" } ,
        { AttributeName: "createdTime", KeyType: "RANGE" }

    ],
    AttributeDefinitions: [
        { AttributeName: "station_id", AttributeType: "S" },
        { AttributeName: "createdTime", AttributeType: "N" }

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
/**
 * Created by bharathula on 11/30/2016.
 */
