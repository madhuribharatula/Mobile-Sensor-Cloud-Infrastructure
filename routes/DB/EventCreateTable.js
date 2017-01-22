// /**
//  * Created by bharathula on 11/30/2016.
//  */
// var AWS = require("aws-sdk");
//
// AWS.config.update({
//     region: "us-west-2",
//     endpoint: "http://localhost:3000"
// });
//
// var dynamodb = new AWS.DynamoDB();
//
// var params = {
//     TableName : "SensordataTable",
//     KeySchema: [
//         { AttributeName: "entity_locationId", KeyType: "HASH"},
//         { AttributeName: "sensedtime", KeyType: "RANGE" }  //Sort key
//           //Partition key
//     ],
//     AttributeDefinitions: [
//         { AttributeName: "entity_locationId", AttributeType: "S" },
//         { AttributeName: "sensedtime", AttributeType: "N" }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 10,
//         WriteCapacityUnits: 10
//     }
// };
//
// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });



/**
 * Created by bharathula on 11/30/2016.
 */
var AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:3000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "FinalTable",
    KeySchema: [
        { AttributeName: "entity_locationId", KeyType: "HASH"},
        { AttributeName: "sensedtime", KeyType: "RANGE" }  //Sort key
        //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "entity_locationId", AttributeType: "S" },
        { AttributeName: "sensedtime", AttributeType: "N" }
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
