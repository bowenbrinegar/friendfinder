const express = require("express");
const bodyParser = require("body-parser");

const AWS = require('aws-sdk');
const busboyBodyParser = require('busboy-body-parser');

const passport = require('passport');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./app/models");

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
const s3 = new AWS.S3();

require('./app/config/passport/passport.js')(passport, db.Users);

require("./app/routing/apiRoutes.js")(app, passport, s3);
require("./app/routing/htmlRoutes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
