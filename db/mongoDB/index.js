const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/grubhub', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const suggestionSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  city: Number,
  description_tags: [String],
  price_range: Number,
  minimum_price: Number,
  wait_time: Number,
  review_count: Number,
  ratings: Object,
  featured_review: Object,
  picture: String,
  bookmarked: Boolean,
});

const Suggestion = mongoose.model('restaurants', suggestionSchema);

module.exports = {
  Suggestion,
};
