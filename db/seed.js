const db = require('./index.js');
const Restaurant = require('./models/Restaurant.js');
const faker = require('faker');
require('events').EventEmitter.prototype._maxListeners = 1000;

const pictures = [
  'https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

//53
const allCuisines = [
  'alcohol', 'american', 'asian', 'bbq', 'bagels', 'bakery', 'cheesesteaks', 'chicken', 'chinese', 'coffee and tea', 'crepes', 'deli', 
  'dessert', 'dim sum', 'eclectic', 'french', 'gluten-free', 'grocery items', 'gyro', 'halal', 'hamburgers', 'hawaiian', 'healthy', 'ice cream', 
  'indian', 'italian', 'japanese', 'jamaican', 'korean', 'latin american', 'lunch specials', 'mediterranean', 'mexican', 'middle eastern', 
  'noodles', 'organic', 'pasta', 'pizza', 'ramen', 'salads', 'sandwiches', 'seafood', 'smoothies and juices', 'soup', 'southern', 'subs', 
  'sushi', 'thai', 'vegan', 'vegetarian', 'vietnamese', 'wings', 'wraps'
];

async function seedMongoDB(outer, inner) {
  let counter = 1;
  for (let j = 0; j < outer; j++) {
    let restaurantsBatch = [];
    for (let i = 0; i < inner; i++) {

      let description_tags = {};
      let tagCount = 0;
      while (tagCount < 2) {
        let randomTag = allCuisines[Math.floor(Math.random() * allCuisines.length)];
        if (!description_tags[randomTag]) {
          description_tags[randomTag] = randomTag;
          tagCount++;
        }
      }

      let row = {
            _id: counter,
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
          console.log(counter);
          counter++;
          restaurantsBatch.push(row);
    }
    await Restaurant.insertMany(restaurantsBatch);
  }
}

async function timeSeed() {
  let before = Date.now();
  await seedMongoDB(10000, 1000);
  let after = Date.now();
  console.log(`MongoDB seeding finished in ${(after - before) / 60000} minutes!`)
} 

timeSeed();