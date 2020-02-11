require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user')

const app = express();

// Global Variables
const PORT = process.env.PORT || 1010;
const MONGODB_URI = `${process.env.MONGODB}`;
const OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

// Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/', indexRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, OPTS)
  .then(result => {
    app.listen(PORT, () => {
      console.log(`\n\n Server running on PORT ${PORT}\n\n`);
    });
  })
  .catch(err => {
    console.log(err);
  });
