const mongoose = require('mongoose');
const { Suggestion} = require('./index.js');
const faker = require('faker');
const pictures = ['https://s.hdnux.com/photos/72/15/17/15350667/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352415/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346423/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15347780/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351888/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351104/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346499/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347796/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15346491/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352160/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352126/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351111/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351873/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351099/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351870/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15351258/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15352488/7/premium_landscape.jpg',
  'https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15347660/7/premium_landscape.jpg', 'https://s.hdnux.com/photos/72/15/17/15346506/7/premium_landscape.jpg',
];

const restaurants = [];

for (let i = 1; i < 101; i += 1) {
  const suggestions = {};
  let count = 0;
  while (count < 12) {
    const randomNum = faker.random.number({
      min: 1,
      max: 100,
    });
    if (!suggestions[randomNum] && randomNum !== i) {
      suggestions[randomNum] = randomNum;
      count += 1;
    }
  }
  restaurants.push({
    id: i,
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
  });
}
console.log('hi')
Suggestion.insertMany(restaurants, (err, restaurants) => {
  if (err) {
    return console.log(err);
  }

  // console.log('in'); 

  console.log('seeding succesful');
  console.log(restaurants[0]);

  mongoose.connection.close();

});
