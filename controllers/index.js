const Entry = require('../models/entry');

exports.getIndexPage = (req, res, next) => {
  const userId = req.user._id;
  Entry.find({ 'metadata.userId': userId })
    .then(entries => {
      res.render('user/main', {
        pageTitle: 'Home',
        entry: entries
      });
    })
    .catch(error => {
      console.log(error);
    });
};
