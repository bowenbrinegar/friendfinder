var db = require('../models')
var isLoggedIn = require('../config/passport/auth.js')
var s3 = require('../config/aws-sdk/aws.js')

module.exports = function (app, passport) {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/survey',
    failureRedirect: '/'
  }))

  app.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/portal',
    failureRedirect: '/'
  }))

  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  });

  app.post('/submit-survey', isLoggedIn, function (req, res) {
    console.log(req.body)
    db.Bios.create({
      bio: req.body.bio,
      college: req.body.college,
      work: req.body.work,
      age: req.body.age,
      sex: req.body.sex,
      lookingFor: req.body.looking,
      UserId: req.user.id
    }).then(function (err) {
      console.log('submit bio success')
    })
  });

  app.post('/submit-image', isLoggedIn, function (req, res) {
  	db.Images.create({
      img: req.body.imgUrl,
      UserId: req.user.id
    }).then(function (err) {
      console.log('submit image success')
      res.redirect('/portal')
    })
  });

  app.post('/interest-submit', isLoggedIn, function (req, res) {
    db.Interests.create({
      interest: req.body.interest,
      UserId: req.user.id
    }).then(function (err) {
      res.send('success')
    })
  });

  app.post('/img-to-s3', isLoggedIn, function (req, res) {
	  let params = {
		  Body: req.body.file,
		  Bucket: 'friendfinder192837465',
		  Key: req.body.filename,
		  ContentType: 'binary/octet-stream'
    };

	  s3.putObject(params, function (err, data) {
		  if (err) console.log(err, err.stack) // an error occurred
		  else console.log(data) // successful response
	  });

	  db.Images.create({
		  path: req.body.filename,
		  UserId: req.user.id
	  }).then(data => {
	  	res.send('success')
	  })
  })
  // app.put("/", function(req, res) {

  // });

  // app.delete("/", function(req, res) {

  // });
}
