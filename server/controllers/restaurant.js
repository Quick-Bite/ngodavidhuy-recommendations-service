const Restaurant = require('../../db/models/Restaurant');

//CREATE
exports.createNewRestaurant = (req, res) => {

};

//READ
exports.getSuggestions = (req, res) => {
  Restaurant.find({_id: req.params.restaurantId}, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let current = results[0];
      let tags = current.description_tags;
      Restaurant.aggregate([ 
         { $match: {
           city: current.city,
           description_tags: { $in: [tags[0], tags[1]]},
           price_range: current.price_range 
          } },
         { $sample: { size: 13 } }
        ],
        (err, body) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json(body);
        });
    }
  });
};

//UPDATE
exports.updateRestaurant = (req, res) => {

};

//DELETE
exports.removeExistingRestaurant = (req, res) => {

};