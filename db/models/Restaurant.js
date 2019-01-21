const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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

restaurantSchema.index({city: 1, description_tags: 1, price_range: 1});

const Restaurant = mongoose.model('restaurants', restaurantSchema);


module.exports = Restaurant;