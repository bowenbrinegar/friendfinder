var db = require('../models');
const Op = db.Sequelize.Op;
var isLoggedIn = require('../config/passport/auth.js');

module.exports = function (app, passport, s3) {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/survey',
    failureRedirect: '/'
  }))

  app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/portal',
    failureRedirect: '/'
  }))

  app.get('/logout', isLoggedIn, function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  })

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
  })

  app.post('/submit-image', isLoggedIn, function (req, res) {
  	db.Images.create({
      img: req.body.imgUrl,
      UserId: req.user.id
    }).then(function (err) {
      console.log('submit image success')
      res.redirect('/portal')
    })
  })

  app.post('/interest-submit', isLoggedIn, function (req, res) {
    db.Interests.create({
      interest: req.body.interest,
      UserId: req.user.id
    }).then(function (err) {
      res.send('success')
    })
  })

  app.post('/img-to-s3', isLoggedIn, function (req, res) {
  	let params = {
		  Body: req.files.myFile.data,
		  Bucket: 'friendfinder192837465',
		  Key: req.files.myFile.name,
		  ContentType: 'binary/octet-stream'
	  };

	  s3.putObject(params, function (err, data) {
		  if (err) console.log(err, err.stack)
		  else console.log(data)
	  });

	  db.Images.create({
		  path: req.files.myFile.name,
		  UserId: req.user.id
	  }).then(data => {
	  	res.send('success')
	  })
  })

  app.get('/get-path', isLoggedIn, function (req, res) {
    db.Images.findAll({
      where: {UserId: req.user.id}
    }).then(data => {
      res.send(data)
    })
  })

  app.post('/get-aws', isLoggedIn, function (req, res) {
    let params = {Bucket: 'friendfinder192837465', Key: req.body.path}
    let url = s3.getSignedUrl('getObject', params)
    res.send(url)
  })

	app.get('/get-queqe', isLoggedIn, function (req, res) {
		console.log(req.user)
		db.Users.findAll({
			limit: 6,
			where: {
				id: {
					[Op.ne]: req.user.id
				}
			},
			include: db.Images
		}).then(data => {
			res.send(data)
		})
	})

  app.post('/get-aws-user', isLoggedIn, function (req, res) {
	  let key = req.body.data.Images[0].path;
	  let params = {Bucket: 'friendfinder192837465', Key: key}
	  let url = s3.getSignedUrl('getObject', params)
	  let data = {url: url, id: req.body.data.id}
    res.json(data)
  })


  // app.put("/", function(req, res) {

  // });

  // app.delete("/", function(req, res) {

  // });
}
