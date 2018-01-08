var express = require("express");
var bodyParser = require("body-parser");

var AWS = require('aws-sdk');
var busboyBodyParser = require('busboy-body-parser');

var passport = require('passport');
var session = require('express-session');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./app/models");

app.use(busboyBodyParser({ limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./app/public"));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUnititialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

AWS.config.update({accessKeyId: 'AKID', secretAccessKey: 'SECRET'});
AWS.config.loadFromPath('/Users/bowenbrinegar/aws/config/credentials.json');
var s3 = new AWS.S3();

require('./app/config/passport/passport.js')(passport, db.Users);

require("./app/routing/apiRoutes.js")(app, passport, s3);
require("./app/routing/htmlRoutes.js")(app);

db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
