exports.getIndexPage = (req, res, next) => {
  res.render('user/main', {
    pageTitle: 'Home'
  });
};
