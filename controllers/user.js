const Entry = require('../models/entry');

exports.getMainPage = (req, res, next) => {
  const user = req.user;
  res.render('user/main', {
    pageTitle: 'Home',
    user
  });
};

exports.postAddRecord = (req, res, next) => {
  const dateCreated = new Date().toISOString().slice(0, 10),
    date = req.body.date,
    time = req.body.time,
    painLoc = req.body.painLocation,
    painDesc = req.body.painDescription,
    painTrig = req.body.painTrigger,
    painRel = req.body.painRelieve,
    painWor = req.body.painWorse,
    painLev = req.body.painLevel;

  const entry = new Entry({
    date: date,
    time: time,
    painLoc: painLoc,
    painDesc: painDesc,
    painTrig: painTrig,
    painRel: painRel,
    painWors: painWor,
    painLev: painLev,
    dateCreated: dateCreated,
    userId: req.user._id
  });
  entry
    .save()
    .then(result => {
      res.redirect('/user/home');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getEntries = (req, res, next) => {
  Entry.find()
    .populate('userId')
    .then(result => {
      res.redirect('/user/home');
    })
    .catch(error => {
      console.log(error);
    });
};
