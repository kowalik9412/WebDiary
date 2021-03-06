require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const csrf = require('csurf');

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');

require('./util/passport')(passport);

const app = express();
const csrfProtect = csrf();

// Global Variables
const PORT = process.env.PORT || 1010;
const MONGODB_URI = `${process.env.MONGODB}`;
// const MONGODB_URI = `${process.env.MONGODBLOCAL}`;
const OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'somerandomstring',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(csrfProtect);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

// Include csrf token in every route
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', indexRoutes);

app.use((req, res, next) => {
  res.status(404).render('error/404', {
    pageTitle: '404 Page not found!',
  });
});

// Connect to MongoDB
mongoose
  .set('useFindAndModify', false)
  .connect(MONGODB_URI, OPTS)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`\n\n Server running on PORT ${PORT}\n\n`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
