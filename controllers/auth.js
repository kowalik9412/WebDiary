exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login Page'
  });
};

exports.getRegisterPage = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register Page'
  });
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email,
    password = req.body.password,
    password2 = req.body.password2;
  let errors = [];

  // Validate input

  if (!email || !password || password2) {
    errors.push({ message: 'Missing fields' });
  }
  if (password !== password2) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      pageTitle: 'Register Page',
      errors
    });
  } else {
    res.send('elo');
    errors = [];
  }
  console.log(errors);
};
