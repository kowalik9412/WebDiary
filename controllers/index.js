exports.getIndexPage = (req, res, next) => {
  const user = req.user;
  res.render('user/main', {
    pageTitle: 'Home',
    user
  });
};
