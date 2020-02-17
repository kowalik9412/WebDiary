exports.getMainPage = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('user/main', {
      pageTitle: 'Main Page'
    });
  } else {
    req.flash('error_message', 'You are not logged in');
    res.redirect('/auth/login');
  }
};
