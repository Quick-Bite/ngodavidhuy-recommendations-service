const faker = require('faker');
const config = require('./config');
const { Pool, Client } = require('pg');
var pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

const db = pgp(config);

const cs = new pgp.helpers.ColumnSet(['_id', 'name', 'food', 'wait_time', 'price_range', 'review_count', 'star_rating', 'good_rating', 
'delivery_rating', 'accurate_rating', 'username_featured', 'review_featured', 'picture', 'region', 'bookmarked'], {table: 'restaurants'});

async function seedPSQL(outer, inner) {
  let counter = 1;
  for (let j = 0; j < outer; j++) {
    let restaurantsBatch = [];
    for (let i = 0; i < inner; i++) {

      let restaurant = {
            _id: counter,
            name: faker.company.companyName(),
            food: faker.lorem.words(),
            wait_time: faker.random.number(60),
            price_range: faker.random.number(15),
            review_count: faker.random.number(2000),
            star_rating: faker.random.number(100),
            good_rating: faker.random.number(100),
            delivery_rating: faker.random.number({
              min: 60,
              max: 100
            }),
            accurate_rating: faker.random.number({
              min: 70,
              max: 100,
            }),
            username_featured: faker.name.firstName(),
            review_featured: faker.lorem.sentence(),
            picture: pictures[faker.random.number(pictures.length - 1)],
            region: faker.random.number({
              min: 1,
              max: 100,
            }),
            bookmarked: faker.random.boolean(),
          };
          console.log(counter);
          counter++;
          restaurantsBatch.push(restaurant);
    }
    const queryStr = pgp.helpers.insert(restaurantsBatch, cs);

    await db.none(queryStr)
    .then( data => {
      console.log('Batch seeded!')
    })
    .catch( err => {
      if (err) {
        console.log('INSIDE CATCH: ', err)
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

