const mongoose = require('mongoose');
const Promise = require('bluebird');
// mongodb://localhost/grubhub
mongoose.connect('mongodb://172.17.0.2/test', {useNewUrlParser: true});

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

const get = (id, callback) => {
  Suggestion.find({ id }, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const restaurants = [];
    for (let i = 0; i < data[0].suggestions.length; i += 1) {
      restaurants.push(Suggestion.find({ id: data[0].suggestions[i] }));
    }
    Promise.all(restaurants)
      .then((values) => {
        callback(null, values);
      })
      .catch((err) => {
        callback(err);
      });
  });
};

module.exports = {
  Suggestion,
  get,
};
