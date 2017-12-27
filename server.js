var express = require("express");
var bodyParser = require("body-parser");

var passport = require('passport');
var session = require('express-session');


var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./app/models");

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

require('./app/config/passport/passport.js')(passport, db.Users);

require("./app/routing/apiRoutes.js")(app, passport);
require("./app/routing/htmlRoutes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
