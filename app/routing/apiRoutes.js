const db = require('../models')
const Op = db.Sequelize.Op
const isLoggedIn = require('../config/passport/auth.js')

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
    }

    s3.putObject(params, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

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

  app.post('/queqe', isLoggedIn, function (req, res) {
    db.Users.findAll({
      limit: 7,
      where: {
        id: {
          [Op.ne]: req.user.id,
          [Op.notIn]: req.body.arr
        }
      },
      include: db.Images
    }).then(data => {
      res.send(data)
    })
  })

  app.post('/get-one', isLoggedIn, function (req, res) {
    db.Images.findOne({
        where: {
          UserId: {
            [Op.ne]: req.user.id,
            [Op.notIn]: req.body.arr
          }
        }
      }).then(data => {
        if (data) {
          let params = {Bucket: 'friendfinder192837465', Key: data.dataValues.path}
          let url = s3.getSignedUrl('getObject', params)
          let obj = {url: url, id: data.dataValues.UserId}
          res.json(obj)
          return
        }
      })
  })

  app.post('/get-aws-user', isLoggedIn, function (req, res) {
    let key = req.body.data.Images[0].path
    let params = {Bucket: 'friendfinder192837465', Key: key}
    let url = s3.getSignedUrl('getObject', params)
    let data = {url: url, id: req.body.data.id}
    res.json(data)
  })

  app.get('/get-profile', isLoggedIn, function (req, res) {
    db.Users.findOne({where: {id: req.user.id}, include: [db.Bios, db.Images]})
      .then(data => {
        let imgArr = [];
        for (let i = 0; i < data.Images.length; i++) {
          let params = {Bucket: 'friendfinder192837465', Key: data.Images[i].dataValues.path}
          let url = s3.getSignedUrl('getObject', params)
          imgArr.push(url)
        }
        let obj = {arr: imgArr, id: req.user.id, bio: data.Bio.dataValues}
        res.json(obj)
      })
  })

  app.get('/get-matches', isLoggedIn, function(req, res) {
    db.Matches.findAll({where: {UserId: req.user.id}})
      .then(data => {
        console.log(data)
        res.send(data)
      })
  })

  app.post('/get-matches-url', isLoggedIn, function(req, res) {
    db.Users.findAll({where: {id: {[Op.in]: req.body.arr}},
      include: [{model: db.Images, limit: 1}]})
      .then(data => {
        let imgArr = []
        for (let i = 0; i < data.length; i++) {
          let params = {Bucket: 'friendfinder192837465',
            Key: data[i].dataValues.Images[0].path}
          let url = s3.getSignedUrl('getObject', params)
          imgArr.push({url: url, id: data[i].dataValues.id})
        }
        res.json(imgArr)
      })
  });

  app.post('/load-on-view', isLoggedIn, function(req, res) {
    db.Images.findOne({where: {UserId: req.body.id}})
      .then(data => {
        let params = {Bucket: 'friendfinder192837465', Key: data.path}
        let url = s3.getSignedUrl('getObject', params)
        let obj = {url: url, id: req.body.id}
        res.json(obj)
      })
  })

  app.post('/like', isLoggedIn, function(req, res) {
    db.Likes.create({
      likeId: req.body.choiceId,
      status: 'like',
      UserId: req.user.id
    }).then(data => {
      console.log('success')
    })

    db.Likes.findOne({where: {likeId: req.user.id, userId: req.body.choiceId}})
      .then(data => {
        if (data) {
          res.send(data)
        } else (
          res.send('n/a')
        )
      })
  })

  app.post('/create-match', isLoggedIn, function(req, res) {
    db.Matches.findOrCreate({where: {
        matchId: req.body.UserId,
        UserId: req.user.id
      }
    }).then(data => {
      res.send('success')
    });
    db.Matches.findOrCreate({where: {
        matchId: req.user.id,
        UserId: req.body.UserId
      }
    }).then(data => {
      res.send('success')
    });
  })

  app.post('/dislike', isLoggedIn, function(req, res) {
    db.Likes.create({
      likeId: req.body.choiceId,
      status: 'dislike',
      UserId: req.user.id
    }).then(data => {
        res.send('success')
    });
  });

  app.post('/fetch-next', isLoggedIn, function(req, res) {
    db.Images.findOne({where: {UserId: req.body.nextId}})
      .then(data => {
        if (data) {
          let params = {Bucket: 'friendfinder192837465', Key: data.path}
          let url = s3.getSignedUrl('getObject', params)
          let obj = {url: url, id: req.body.nextId}
          res.json(obj)
          return
        }
      });
  });

  app.get('/get-likes', isLoggedIn, function(req, res) {
    db.Likes.findAll({where: {UserId: req.user.id}})
      .then(data => {
        res.send(data)
      }).catch(err => {
        console.log(err)
    })
  })

  // app.get('/get-dislikes', isLoggedIn, function(req, res) {
  //
  // })
  // app.put("/", function(req, res) {

  // });

  // app.delete("/", function(req, res) {

  // });
}
