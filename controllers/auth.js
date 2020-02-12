const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login Page'
  });
};

exports.getRegisterPage = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register'
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
      pageTitle: 'Register',
      errors
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: 'User with this email exists' });
          res.render('auth/register', {
            pageTitle: 'Register - User Exists',
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
            .catch(error => {
              errors.push({
                message: 'Something went wrong with hashing password. Try again'
              });
              res.render('auth/register', {
                pageTitle: 'Register',
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
