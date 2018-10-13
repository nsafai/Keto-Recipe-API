// controllers/users.js

module.exports = (app) => {
  const jwt = require('jsonwebtoken');
  const UserSchema = require('../models/user');
  const favorites = require('./favorites')

  // Render the signup form
  app.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

  // POST: creates a new user
  app.post('/sign-up', (req, res) => {
    // CREATE User and JWT
    const user = new UserSchema(req.body);

    user.save().then((user) => {
      const token = jwt.sign({
        _id: user._id
      }, process.env.SECRET, {
        expiresIn: '60 days'
      });
      res.cookie('nToken', token, {
        maxAge: 900000,
        httpOnly: true
      });
      app.locals.username = req.body.username;
      res.redirect('/');
      // res.send("blah")
    }).catch((err) => {
      return res.status(400).send({
        err
      });
    });
  });

  // LOGIN FORM
  app.get('/login', (req, res) => {
    res.render('login.hbs');
  });

  // LOGIN USER
  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    app.locals.username = req.body.username;

    // Look for this user name
    UserSchema.findOne({
        username
      }, 'username password')
      .then((user) => {
        if (!user) {
          // User not found
          return res.status(401).send({
            message: 'Wrong Username or Password'
          });
        }

        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            return res.status(401).send({
              message: 'Wrong Username or Password'
            });
          }

          // Create the token
          const token = jwt.sign({
            _id: user._id,
            username: user.username
          }, process.env.SECRET, {
            expiresIn: '60 days'
          });
          // Set a cookie and redirect to root
          res.cookie('nToken', token, {
            maxAge: 900000,
            httpOnly: true
          });
          console.log('Successfully logged in.');
          res.redirect('favorites/');
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    app.locals.username = null;
    res.redirect('back'); // to automatically redirect back to the page the request came from
  });

};
