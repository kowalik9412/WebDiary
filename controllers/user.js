const Entry = require('../models/entry');
const User = require('../models/user');

exports.getMainPage = (req, res, next) => {
  const userId = req.user._id;
  Entry.find({ 'metadata.userId': userId })
    .then(entries => {
      console.log(entries);
      res.render('user/main', {
        pageTitle: 'Home',
        entry: entries
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postAddRecord = (req, res, next) => {
  const userId = req.user._id;
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
    timeStamp: {
      date: date,
      time: time
    },
    data: {
      painLoc: painLoc,
      painDesc: painDesc,
      painTrig: painTrig,
      painRel: painRel,
      painWors: painWor,
      painLev: painLev
    },
    metadata: {
      dateCreated: dateCreated,
      userId: req.user._id
    }
  });
  entry
    .save()
    .then(result => {
      User.findOne({ _id: userId }, (error, user) => {
        if (error) {
          console.log(error);
        }
        if (user) {
          user.entries.push(entry);
          user.save();
          res.redirect('/user/home');
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getEntries = (req, res, next) => {
  const userId = req.user._id;
  Entry.find({ 'metadata.userId': userId })
    .then(entries => {
      console.log(entries);
      res.redirect('/user/home');
    })
    .catch(error => {
      console.log(error);
    });
};
