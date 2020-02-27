const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require('passport');
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendGrid({
    auth: {
      api_key: `${process.env.NODEMAILERAPIKEY}`
    }
  })
);

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Sign In Page'
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/user/home',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
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

exports.getResetPage = (req, res, next) => {
  res.render('auth/reset', {
    pageTitle: 'Reset your password'
  });
};

exports.postReset = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      console.log(error);
      return res.redirect('/auth/reset');
    }

    const token = buffer.toString('hex');
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          req.flash('error_message', 'Invalid credentials');
          return res.redirect('/auth/reset');
        }

        user.resetToken = token;
        user.resetTokenTime = Date.now() + 3600000; // 1hr
        return user.save();
      })
      .then(result => {
        req.flash('success_message', 'Check your email');
        res.redirect('login');
        transporter.sendMail({
          to: email,
          from: 'resetPassword@webDiary.com',
          subject: 'Reset Password',
          html: `
            <p>Hello, you have requested a password reset</p>
            <p>Click <a href="http://localhost:1010/auth/reset/${token}">here</a> to reset your password now</p>
          `
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
