
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var mysql = require('mysql');

var request = REQUEST.defaults( {
    strictSSL: false
});

exports.getreport = function(req, res) {
  /*var connection = mysql.createConnection({
      host     : 'us-cdbr-sl-dfw-01.cleardb.net',
      user     : 'b2b5ec2b876702',
      password : '6bc1ee11 ',
      database : 'my_db'
    });

  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
          console.log('The solution is: ', results[0].solution);
        });

        connection.end(); */
console.log("I am in functon");
    var report = [{
      name: "vamsi",
      number:10
    },{
      name: "harsha",
      number: 20
    }];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(report));
};
router.get('/getreport', exports.getreport);
exports.router = router;
