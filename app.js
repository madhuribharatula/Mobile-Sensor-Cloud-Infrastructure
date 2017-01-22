var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index1');
var routes = require('./routes');
var admins = require('./routes/admins');
var users = require('./routes/users');
var owners = require('./routes/vendors');
var readData = require('./routes/ReadEvents');
var http = require('http');
var signin = require('./routes/signin');
var chart = require('./routes/chart');
var dynodashboard = require('./routes/GetAvailableSensors');
var mysql = require('mysql');
var sensorhubmanagement = require('./routes/SensorHubManagement');
var sensormanagement = require('./routes/SensorManagement');
var adminmanagement = require('./routes/adminManagement');
var userDashboardManagement =  require('./routes/userDashboard');
var billingpage=require('./routes/billing');
var app = express();

var AWS = require("aws-sdk");
app.set('port', process.env.PORT || 8080);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var signuppage = require('./routes/signup');

var servicepage = require('./routes/service');
var loginpage = require('./routes/login');
var userdatatemppage = require('./routes/userdatatemp');
var user = require('./routes/user');
var seesensorpage = require('./routes/seesensors');
var userdatagpspage = require('./routes/userdatagps');
var deleteSensorPage = require('./routes/deletesensor');

app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'cmpe281', resave: true, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, 'public')));

AWS.config.update({
    region: "us-west-2",
     accessKeyId: "AKIAJWC2LRE3JHQEVNXQ",
    secretAccessKey: "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",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

if ('development', function () {
        app.use(express.errorHandler());
    });

function requireLogin(req, res, next) {
    if (!req.session.user && !req.session.admin) {
        res.redirect('/');
    } else {
        next();
    }
};


app.get('/', routes.index);
app.post('/signin', signin.signin);

app.post('/addSensorDB',requireLogin,sensormanagement.addsensor);
app.get('/ManageSensor', requireLogin,sensormanagement.getsensors);
app.post('/stopSensor',requireLogin,sensormanagement.stopSensor);
app.post('/deleteSensor',requireLogin,sensormanagement.deleteSensor);
app.post('/startSensor',requireLogin,sensormanagement.startSensor);
app.get('/addSensorUI',requireLogin,sensormanagement.gethubList);


app.get('/addSensorHub',requireLogin,function (req, res) {
    res.render('../views/addSensorHub.ejs');
});
app.post('/deleteHub',requireLogin,sensorhubmanagement.deleteSensorhub);
app.post('/addhub',requireLogin,sensorhubmanagement.addhub);
app.post('/viewSensorwithHub',requireLogin,sensorhubmanagement.getsensorsinHub);

app.get('/ManageSensorHub',requireLogin,sensorhubmanagement.gethubDetails);

app.get('/signout', requireLogin, function (req, res) {
    req.session.destroy();
    res.render('login', { title: '' });
});

app.get('/userDashboard', requireLogin,userDashboardManagement.dataPerStatus);


app.get('/adminDashboard', requireLogin, function (req, res) {
    res.render('../views/adminDashboard.ejs');
});

app.get('/charts', requireLogin, function (req, res) {
    res.render('../views/chartdemo.ejs');
});

app.get('/trainCharts', requireLogin, function (req, res) {
    res.render('../views/trainChartsDemo.ejs');
});

app.get('/locationCharts', requireLogin, function (req, res) {
    res.render('../views/locationChartsDemo.ejs');
});
app.get('/admincharts', requireLogin, adminmanagement.getLocationTypeChart);

app.get('/Manageusers', requireLogin,adminmanagement.getUsers);

app.get('/vendorCharts', requireLogin, function (req, res) {
    res.render('../views/vendorchartdemo.ejs');
});
app.get('/vendorDashboard', requireLogin, function (req, res) {
    res.render('../views/vendorDashboard.ejs');
});


app.get('/', routes.index);
app.get('/login', loginpage.login);
app.post('/login', loginpage.authenticate);

app.get('/adminlogin',loginpage.adminlogin);
app.post('/adminlogin',loginpage.adminCheck);

app.get('/users', user.list);
app.get('/signup', signuppage.signup);
app.get('/services', servicepage.service);
app.get('/service', servicepage.service);
app.post('/service', servicepage.aa);
app.post('/userdatatemp', userdatatemppage.addtempsensor);
app.get('/seesensors', seesensorpage.seesonsors);
app.post('/userdatagps', userdatagpspage.addgpssensor);
app.post('/delete', deleteSensorPage.deletesensor);
app.get('/billing',billingpage.billing);




var server = require('http').Server(app);
var io = require('socket.io')(server);
//var io = require('socket.io').listen(server);
server.listen(8080);

var mysql = require('mysql');



var db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vtamobilesensorclouddb',
    port: 3306
});

db1.connect(function (err) {
    if (err) console.log(err);
});

var _ = require('underscore');
var dateFormat = require('dateformat');


io.on('connection', function (socket) {

    


    // to show location for every 5 seconds -- commented for other testing

    var timerd = setInterval(function() {
        querydata(function(err,result) {
            if(err) {
                console.info(err);
            } else {
                //console.log(result);

            }
        });
        function querydata(callback) {

            var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                TableName: "station_details",
                ProjectionExpression: "station_id,latitude,longitude",
                ScanIndexForward: false,
                LIMIT:1
            };
            docClient.scan(params, function (err, result)
            {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Scan succeeded." + result);
                    var items = [];
                    items = items.concat(result.Items);
                    latitude = items[0].latitude;
                    longitude = items[0].longitude;
                    console.log(latitude);
                    console.log(longitude);
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Scan succeeded.");
                        socket.emit('Google_map_data', {
                            latitude1: latitude,
                            longitude1: longitude

                        });


                    }
                }
            });
        };
    }, 6000);



});

app.get('/GoogleMapData',dynodashboard.getsensors);
app.get('/scanDashBoard', dynodashboard.scanSensorData);
app.get('/getSensorData', dynodashboard.getSensorData);


console.log('Express server listening on port ' + app.get('port'));


//localhost