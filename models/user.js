const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});

module.exports = mongoose.model('User', userSchema);
