// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');
const Restaurant = require('../../db/models/Restaurant');
const faker = require('faker');

//CREATE
exports.createNewRestaurant = (req, res) => {
  Restaurant.find({}).sort({_id: -1}).limit(1)
  .then( lastRecord => {
    let newRestaurant = {
      _id: lastRecord[0]._id + 1,
      name: 'Hack Reactor',
      city: 505,
      description_tags: ['alcohol', 'bakery'],
      price_range: 5,
      minimum_price: 1,
      wait_time: 1,
      review_count: 1,
      ratings: {
        star_rating: 50,
        food_rating: 60,
        delivery_rating: 60,
        order_accuracy_rating: 60
      },
      featured_review: {
        username: 'wavydavy',
        review: 'stress testing my post',
      },
      picture: 'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg',
      bookmarked: false,
    }

    Restaurant.create(newRestaurant)
    .then((results) => res.status(201).send(results))
    .catch(res.status(500).send(err))
  })
  .catch(err =>  res.status(500).send(err));
};

// READ
// exports.getSuggestionsCached = (redis, _id, callback) => {
//   redis.get(_id, (err, reply) => {
//     if (err) {
//       callback(null) 
//     } else if (reply) {
//       callback(JSON.parse(reply));
//     } else {
//       Restaurant.find({_id: _id}, (err, doc) => {
//         if (err || !doc) {
//           callback(null);
//         } else {
//           let current = doc[0];
//           let tags = current.description_tags;
//           Restaurant.aggregate([ 
//              { $match: {
//                city: current.city,
//                description_tags: { $in: [tags[0], tags[1]]},
//                price_range: current.price_range 
//               } },
//              { $sample: { size: 13 } }
//             ],
//             (err, body) => {
//               if (err) {
//                 callback(null);
//               }
//               redis.set(_id, JSON.stringify(body))
//               callback(body);
//             });
//         }
//       });
//     }
//   })
// };

exports.getSuggestions = (req, res) => {
  Restaurant.find({_id: req.params.id}, (err, results) => {
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
  let updatedRestaurant = {
    _id: req.params.id,
    name: faker.company.companyName(),
    city: faker.random.number({
      min: 1,
      max: 482,
    }),
    description_tags: Object.values(description_tags),
    price_range: faker.random.number({
      min: 1,
      max: 5
    }),
    minimum_price: faker.random.number(15),
    wait_time: faker.random.number(60),
    review_count: faker.random.number(2000),
    ratings: {
      star_rating: faker.random.number({
        min: 1,
        max: 100
      }),
      food_rating: faker.random.number({
        min: 60,
        max: 100
      }),
      delivery_rating: faker.random.number({
        min: 60,
        max: 100
      }),
      order_accuracy_rating: faker.random.number({
        min: 60,
        max: 100
      })
    },
    featured_review: {
      username: faker.name.firstName(),
      review: faker.lorem.sentence(),
    },
    picture: pictures[faker.random.number(pictures.length - 1)],
    bookmarked: faker.random.boolean(),
  };
  Restaurant.findByIdAndUpdate({_id: req.params.id}, updatedRestaurant, (err, results) => {
    if (err) {
      return res.status(204).send(err);
    }
    return res.status(200).send(results);
  }).lean();
};

//DELETE
exports.removeExistingRestaurant = (req, res) => {
  Restaurant.findByIdAndRemove({_id: req.body._id}, (err, results) => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.status(202).send(results);
  }).lean();
};

// exports.createNewRestaurant = async (req, res) => {
//   let lastRecord = await Restaurant.find({}).sort({_id: -1}).limit(1);
//   console.log(lastRecord[0]._id);
//   let newRestaurant = {
//     _id: lastRecord[0]._id + 1,
//     name: 'Hack Reactor',
//     city: 505,
//     description_tags: ['alcohol', 'bakery'],
//     price_range: 5,
//     minimum_price: 1,
//     wait_time: 1,
//     review_count: 1,
//     ratings: {
//       star_rating: 50,
//       food_rating: 60,
//       delivery_rating: 60,
//       order_accuracy_rating: 60
//     },
//     featured_review: {
//       username: 'wavydavy',
//       review: 'stress testing my post',
//     },
//     picture: 'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg',
//     bookmarked: false,
//   };

//   await Restaurant.insertMany([newRestaurant], (err, results) => {
//     if (err) {
//       return res.status(422).send(err);
//     }
//     return res.status(201).send(results);
//   });
// };