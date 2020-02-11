exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login Page'
  })
};

exports.getRegisterPage = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register Page'
  })
};
