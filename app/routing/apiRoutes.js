var db = require('../models')
var isLoggedIn = require('../config/passport/auth.js')

module.exports = function (app, passport) {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/survey',
    failureRedirect: '/'
  }))

  app.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/portal',
		failureRedirect: '/'
  }));

  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    });
  });

  app.post("/submit-survey", isLoggedIn, function(req, res) {
		console.log(req.body)
		db.Bios.create({
			bio: req.body.bio,
			college: req.body.college,
			work: req.body.work,
			age: req.body.age,
			sex: req.body.sex,
			lookingFor: req.body.looking,
			UserId: req.user.id
		}).then(function(err) {
			console.log('submit bio success')
		})
  });

  app.post('/submit-image', isLoggedIn, function(req, res) {
  	db.Images.create({
			img: req.body.imgUrl,
			UserId: req.user.id
		}).then(function(err) {
			console.log('submit image success')
			res.redirect('/portal')
		})
	})


	app.post('/interest-submit', isLoggedIn, function(req, res) {
		db.Interests.create({
			interest: req.body.interest,
			UserId: req.user.id
		}).done(function(err) {
			res.send('success')
		})
	})
  // app.put("/", function(req, res) {

  // });

  // app.delete("/", function(req, res) {

  // });
}
