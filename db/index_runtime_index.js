const mongoose = require('mongoose');
const Promise = require('bluebird');
// mongodb://localhost/grubhub
mongoose.connect('mongodb://localhost/grubhub', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/grubhub');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>  {
  // we're connected!
  console.log('connected');
});

const suggestionSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  food: String,
  waitingTime: Number,
  minimum: Number,
  reviewNo: Number,
  reviewSummary: Object,
  review: Object,
  picture: String,
  region: {
    type: Number,
    index: true
  },
  bookmarked: Boolean,
});

const Suggestion = mongoose.model('jdogs', suggestionSchema);

module.exports = {
  Suggestion,
};
