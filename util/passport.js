const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
          }

          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              throw error;
            }

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid credentials' });
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
