const faker = require('faker');
const config = require('./config');
var pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});
const db = pgp(config);

const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
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



const cs = new pgp.helpers.ColumnSet(['_id', 'name', 'city', 'price_range', 'tag1', 'tag2', 'wait_time', 'min_price', 'review_count', 'star_rating', 'food_rating', 
'delivery_rating', 'order_accuracy_rating', 'featured_review', 'featured_username', 'picture', 'bookmarked'], {table: 'restaurants'});

async function seedPSQL(outer, inner) {
  let counter = 1;
  for (let j = 0; j < outer; j++) {
    let restaurantsBatch = [];
    for (let i = 0; i < inner; i++) {

      let tags = [];

      while (tags.length < 2) {
        let randomTag = allCuisines[Math.floor(Math.random() * allCuisines.length)];
        if (tags.indexOf(randomTag) === -1) {
          tags.push(randomTag);
        }
      }

      let restaurant = {
            _id: counter,
            name: faker.lorem.word(),
            city: faker.random.number({
              min: 1,
              max: 482,
            }),
            price_range: faker.random.number({
              min: 1,
              max: 5,
            }),
            tag1: tags[0],
            tag2: tags[1],
            wait_time: faker.random.number(60),
            min_price: faker.random.number(15),
            review_count: faker.random.number(2000),
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
            }),
            featured_review: faker.lorem.sentence(),
            featured_username: faker.name.firstName(),
            picture: pictures[faker.random.number(pictures.length - 1)],
            bookmarked: faker.random.boolean(),
          };
          console.log(counter);
          counter++;
          restaurantsBatch.push(restaurant);
    }
    const queryStr = pgp.helpers.insert(restaurantsBatch, cs);

    await db.none(queryStr)
    .then( () => {
      console.log('Batch seeded!');
    })
    .catch( err => {
      if (err) {
        console.log('INSIDE CATCH: ', err);
      }
    });
  }
}

async function timeSeed () {
  let before = Date.now();
  await seedPSQL(1000, 10000);
  let after = Date.now();
  console.log(`PSQL Seeding finished in ${(after - before) / 60000} minutes!`);
} 

timeSeed();

