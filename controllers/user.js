const Entry = require('../models/entry');
const User = require('../models/user');
const fuzzySearch = require('fuzzy-search');

exports.getMainPage = (req, res, next) => {
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

exports.getEditRecord = (req, res, next) => {
  const id = req.params.id;
  Entry.findById(id)
    .then(entry => {
      res.render('user/edit', {
        pageTitle: 'Edit Entry',
        entry: entry
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postEditRecord = (req, res, next) => {
  const id = req.params.id;
  const date = req.body.date,
    time = req.body.time,
    painLoc = req.body.painLocation,
    painDesc = req.body.painDescription,
    painTrig = req.body.painTrigger,
    painRel = req.body.painRelieve,
    painWor = req.body.painWorse,
    painLev = req.body.painLevel;

  const entry = {
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
    }
  };

  Entry.findByIdAndUpdate(id, entry)
    .then(entry => {
      res.redirect('/user/home');
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

exports.postDeleteRecord = (req, res, next) => {
  const id = req.params.id;

  Entry.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/user/home');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postFuzzySearch = (req, res, next) => {
  const userInput = req.body.searchAnything;
  const userId = req.user._id;

  Entry.find({ 'metadata.userId': userId })
    .then(entries => {
      const searchOptions = new fuzzySearch(entries, [
        'timeStamp.date',
        'timeStamp.time',
        'data.painLoc',
        'data.painDesc',
        'data.painTrig',
        'data.painRel',
        'data.painWors',
        'data.painLev'
      ]);
      const lookup = searchOptions.search(userInput);
      res.render('user/main', {
        pageTitle: 'Home',
        entry: lookup
      });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/user/home');
    });
};
