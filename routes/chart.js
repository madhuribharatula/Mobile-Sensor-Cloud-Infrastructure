// exports.charts = function(req, res) {
//     var express = require("express");
//     var mysql = require('mysql');
//     var app = express();
//
//     var pool = mysql.createPool({
//         connectionLimit: 10, //important
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: 'root',
//         database: 'opc',
//         debug: false,
//         acquireTimeout: 30000
//     });
//
//     app.use(express.static('public'));
//
//     function handle_database(req, res) {
//
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 console.log(err);
//                 res.json({"code": 100, "status": "Error in connection database"});
//                 return;
//             }
//
//             console.log('connected as id ' + connection.threadId);
//
//             connection.query('SELECT * from opc.variables order by timestamp', function (err, rows, fields) {
//                 connection.release();
//                 if (!err) {
//                     res.json(rows);
//                 }
//             });
//
//             connection.on('error', function (err) {
//                 res.json({"code": 100, "status": "Error in connection database"});
//
//             });
//         });
//     }
//
//     app.get("/service1", function (req, res) {
//         handle_database(req, res);
//     });
//
//
// }
//
