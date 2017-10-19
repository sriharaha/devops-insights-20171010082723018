/*jshint node:true*/

var express = require("express");
var bodyParser = require('body-parser');
var apiv1 = require('./routes/apiv1.js');
var EJS = require('ejs');

EJS.open = "<ejs>";
EJS.close = "</ejs>";

var host = process.env.PORT ? '0.0.0.0' : 'localhost';
var port = (process.env.PORT || 3456);
var url = require('url').format({hostname: host, port: port, protocol: 'http'});

var app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api/v1/', apiv1.router);

var http = require('http');
var server = http.createServer(app);
server.listen(port, function () {
    console.log('Weather Report listening on ' + url);
});

app.get("/", function(req, res) {
    return res.render('index');
});

app.get("/report", function(req, res){
   //Fetech from database
   var mysql = require('mysql');

 var con = mysql.createConnection({
   host: "us-cdbr-sl-dfw-01.cleardb.net",
   user: "b6dc2d4d29ec61",
   password: "cc038d80",
   database: "ibmx_97718cb7c308637"
 });
 var json =[];

 con.connect(function(err) {
   if (err) throw err;
   con.query("select * from `ibmx_97718cb7c308637`.`is`", function (err, result, fields) {
     if (err) throw err;
     //console.log(result);
 	var jsonsting = JSON.stringify(result);
      json = JSON.parse(jsonsting);
return res.render("report", {report : json});
   });
 });

  
})
