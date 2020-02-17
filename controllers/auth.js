const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Sign In Page'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let errors = [];

  passport.authenticate('local', {
    successRedirect: '/user/home',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);

  // User.findOne({ email: email })
  //   .then(user => {
  //     if (!user) {
  //       errors.push({
  //         message: 'This email does not exist in our database.'
  //       });
  //       res.render('auth/login', {
  //         pageTitle: 'Sign In',
  //         errors
  //       });
  //     }
  //     bcrypt.compare(password, user.password, (err, result) => {
  //       if (result) {
  //         res.redirect('/user/home');
  //       } else {
  //         errors.push({
  //           message: 'Wrong password. Try again.'
  //         });
  //         res.render('auth/login', {
  //           pageTitle: 'Sign In',
  //           errors
  //         });
  //       }
  //     });
  //   })
  //   .catch(error => {
  //     errors.push({
  //       message: 'Something went wrong. Try again.'
  //     });
  //     res.render('auth/login', {
  //       pageTitle: 'Sign In',
  //       errors
  //     });
  //     console.log(error);
  //   });
};

exports.getLogout = (req, res, next) => {
  req.logout();
  req.flash('success_message', 'You have successfully logged out');
  res.redirect('/auth/login');
};

exports.getRegisterPage = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Sign Up'
  });
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  let errors = [];

  // Validate input

  // if (!email || !password || password2) {
  //   errors.push({ message: 'Missing fields' });
  // }
  if (password !== password2) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      pageTitle: 'Sign Up',
      errors
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: 'User with this email exists' });
          res.render('auth/register', {
            pageTitle: 'Sign Up - User Exists',
            errors
          });
        } else {
          bcrypt
            .hash(password, 10)
            .then(hashedPassword => {
              const user = new User({
                email: email,
                password: hashedPassword
              });
              user.save();
            })
            .then(result => {
              req.flash('success_message', 'You can now sign in');
              res.redirect('login');
            })
            .catch(error => {
              errors.push({
                message: 'Something went wrong with hashing password. Try again'
              });
              res.render('auth/register', {
                pageTitle: 'Sign Up',
                errors
              });
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
