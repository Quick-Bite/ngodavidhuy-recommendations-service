const mongoose = require('mongoose');
const { Suggestion } = require('./index.js');
const faker = require('faker');
const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

require('events').EventEmitter.prototype._maxListeners = 1000;

async function seedMongoDB(outer, inner) {
  let counter = 1;
  for (let j = 0; j < outer; j++) {
    let restaurantsBatch = [];
    for (let i = 0; i < inner; i++) {
      const suggestions = {};
      let s = 0;
      while (s < 12) {
        const randomNum = faker.random.number({
          min: 1,
          max: 10000000,
        });
        if (!suggestions[randomNum] && randomNum !== counter) {
          suggestions[randomNum] = randomNum;
          s += 1;
        }
      }

      let restaurant = {
            id: counter,
            name: faker.company.companyName(),
            food: faker.lorem.words(),
            waitingTime: faker.random.number(60),
            minimum: faker.random.number(15),
            reviewNo: faker.random.number(2000),
            reviewSummary: {
              stars: faker.random.number(100),
              good: faker.random.number(100),
              onTime: faker.random.number({
                min: 60,
                max: 100,
              }),
              accurate: faker.random.number({
                min: 70,
                max: 100,
              }),
            },
            review: {
              username: faker.name.firstName(),
              review: faker.lorem.sentence(),
            },
            picture: pictures[faker.random.number(pictures.length - 1)],
            suggestions: Object.values(suggestions),
            bookmarked: faker.random.boolean(),
          };
          restaurantsBatch.push(restaurant);
          counter++;
          console.log(counter);
    }
    await Suggestion.insertMany(restaurantsBatch);
  }
}

async function timeSeed () {
  let before = Date.now();
  await seedMongoDB(1, 1000);
  let after = Date.now();
  console.log(`MongoDB seeding finished in ${(after - before) / 60000} minutes!`)
} 

timeSeed();