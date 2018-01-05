var bCrypt = require('bcrypt-nodejs');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport, user) {
  var Users = user
  var LocalStrategy = require('passport-local').Strategy

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    Users.findById(id).then(function (user) {
      if (user) {
        done(null, user.get())
      } else {
        done(user.errors, null)
      }
    })
  })

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function (req, email, password, done) {
      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
      }
      Users.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (user) {
          return done(null, false, {
            message: 'Email Taken'
          })
        } else {
          var userPassword = generateHash(password)
          var data = {
            name: req.body.name,
            email: req.body.email,
            password: userPassword
          }
          Users.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false)
            }
            if (newUser) {
              return done(null, newUser)
            }
          })
        }
      })
    }

  ))

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function (req, email, password, done) {
      var User = user

      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass)
      }
      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist'
          })
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          })
        }
        var userinfo = user.get()
        return done(null, userinfo)
      }).catch(function (err) {
        console.log('Error:', err)
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        })
      })
    }
  ))


  passport.use(new FacebookStrategy({
    new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        var user = new user ({
          email: profile.email
          name: profile.displayName
        })

        Facebooks.findOne({where: {email: user.email}})

      })
    }
  ));
}
