const mongoose = require('mongoose');
const Promise = require('bluebird');
// mongodb://localhost/grubhub
mongoose.connect('mongodb://localhost/jacky', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>  {
  // we're connected!
  console.log('connected');
});

const suggestionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  food: String,
  waitingTime: Number,
  minimum: Number,
  reviewNo: Number,
  reviewSummary: Object,
  review: Object,
  picture: String,
  suggestions: Array,
  bookmarked: Boolean,
});


const Suggestion = mongoose.model('Suggestion', suggestionSchema);


module.exports = {
  Suggestion,
};

