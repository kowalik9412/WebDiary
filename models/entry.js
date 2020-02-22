const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  timeStamp: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  data: {
    painLoc: {
      type: String,
      required: true
    },
    painDesc: {
      type: String,
      required: true
    },
    painTrig: {
      type: String,
      required: true
    },
    painRel: {
      type: String,
      required: true
    },
    painWors: {
      type: String,
      required: true
    },
    painLev: {
      type: String,
      required: true
    }
  },
  metadata: {
    dateCreated: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Entry', entrySchema);
