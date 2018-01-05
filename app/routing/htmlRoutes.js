var path = require('path');
var isLoggedIn = require('../config/passport/auth.js');
// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/survey", isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/portal", isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};