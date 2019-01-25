const config = require('../../config').redis
const redisClient = require('redis').createClient;
const redis = redisClient(6379, `${config.host}`, {password: `${config.password}`});
redis.on('connect', () => {
  console.log('REDIS INSIDE SERVER CONTROLLER CONNECTED');
});

redis.on('error', (err) => {
  console.log('REDIS ERROR: ', err);
});

const Restaurant = require('../../db/models/Restaurant');
const faker = require('faker');
const db = require('../../db/index');

const pictures = [
  'https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

const allCuisines = [
  'alcohol', 'american', 'asian', 'bbq', 'bagels', 'bakery', 'cheesesteaks', 'chicken', 'chinese', 'coffee and tea', 'crepes', 'deli', 
  'dessert', 'dim sum', 'eclectic', 'french', 'gluten-free', 'grocery items', 'gyro', 'halal', 'hamburgers', 'hawaiian', 'healthy', 'ice cream', 
  'indian', 'italian', 'japanese', 'jamaican', 'korean', 'latin american', 'lunch specials', 'mediterranean', 'mexican', 'middle eastern', 
  'noodles', 'organic', 'pasta', 'pizza', 'ramen', 'salads', 'sandwiches', 'seafood', 'smoothies and juices', 'soup', 'southern', 'subs', 
  'sushi', 'thai', 'vegan', 'vegetarian', 'vietnamese', 'wings', 'wraps'
];

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
    .catch(err =>  res.status(500).send(err));
  })
  .catch(err =>  res.status(500).send(err));
  
  
};

//READ
exports.getSuggestionsCached = (redis, _id, callback) => {
  redis.get(_id, (err, reply) => {
    if (err) {
      callback(null) 
    } else if (reply) {
      callback(JSON.parse(reply));
    } else {
      Restaurant.find({_id: _id}, (err, doc) => {
        if (err || !doc) {
          callback(null);
        } else {
          let current = doc[0];
          let tags = current.description_tags;
          Restaurant.aggregate([ 
             { $match: {
               city: current.city,
               description_tags: { $in: [tags[0], tags[1]]},
               price_range: current.price_range 
              } },
              { $limit: 13 }
            ],
            (err, body) => {
              if (err) {
                callback(null);
              }
              redis.set(_id, JSON.stringify(body))
              callback(body);
            });
        }
      });
    }
  })
};

// exports.getSuggestions = (req, res) => {
//   Restaurant.find({_id: req.params.id}, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       let current = results[0];
//       let tags = current.description_tags;
//       Restaurant.aggregate([ 
//          { $match: {
//            city: current.city,
//            description_tags: { $in: [tags[0], tags[1]]},
//            price_range: current.price_range 
//           } },
//          { $limit: 13 }
//         ],
//         (err, body) => {
//           if (err) {
//             res.status(500).send(err);
//           }
//           res.status(200).json(body);
//         });
//     }
//   });
// };

//UPDATE
exports.updateRestaurant = (req, res) => {
  let description_tags = {};

  let tagCount = 0;
  while (tagCount < 2) {
    let randomTag = allCuisines[Math.floor(Math.random() * allCuisines.length)];
    if (!description_tags[randomTag]) {
      description_tags[randomTag] = randomTag;
      tagCount++;
    }
  }

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
  });
};

//DELETE
exports.removeRestaurant = (req, res) => {
  Restaurant.deleteOne({_id: req.params.id})
  .then(() => res.status(202).send(`Record ${req.params.id} deleted!`))
  .catch(err => res.status(404).send(err));
};

