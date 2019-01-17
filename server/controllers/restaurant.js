const Restaurant = require('../../db/models/Restaurant');

//CREATE
exports.createNewRestaurant = (req, res) => {

};

//READ
exports.getSuggestions = (req, res) => {
  Restaurant.find({_id: 1}, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let currentRecord = results[0];
      console.log(currentRecord);
      Restaurant.aggregate([ 
         { $match: {
           city: 253,
           description_tags: { $in: ['asian', 'coffee and tea']},
           price_range: 1 
          } },
         { $sample: { size: 13 } }
        ],
        (err, body) => {
          if (err) {
            console.log(err);
          }
          
          console.log('mike', body);
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