const faker = require('faker');
const config = require('./config');
var pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const db = pgp(config);

const cs = new pgp.helpers.ColumnSet(['_id', 'description'], {table: 'description_tags'});

const allCuisines = [
  'alcohol', 'american', 'asian', 'bbq', 'bagels', 'bakery', 'cheesesteaks', 'chicken', 'chinese', 'coffee and tea', 'crepes', 'deli', 
  'dessert', 'dim sum', 'eclectic', 'french', 'gluten-free', 'grocery items', 'gyro', 'halal', 'hamburgers', 'hawaiian', 'healthy', 'ice cream', 
  'indian', 'italian', 'japanese', 'jamaican', 'korean', 'latin american', 'lunch specials', 'mediterranean', 'mexican', 'middle eastern', 
  'noodles', 'organic', 'pasta', 'pizza', 'ramen', 'salads', 'sandwiches', 'seafood', 'smoothies and juices', 'soup', 'southern', 'subs', 
  'sushi', 'thai', 'vegan', 'vegetarian', 'vietnamese', 'wings', 'wraps'
];

async function seed_descriptionTags() {
  let counter = 0;
  let batch = [];

  while (counter < allCuisines.length) {
    batch.push({
      _id: counter + 1,
      description: allCuisines[counter]
    });
    console.log(counter);
    counter++;
  }

  const queryStr = pgp.helpers.insert(batch, cs);

  await db.none(queryStr)
  .then( () => {
    console.log('DONE!');
  })
  .catch( err => {
    if (err) {
      console.log('INSIDE CATCH: ', err)
    }
  });
}

async function timeSeed () {
  let before = Date.now();
  await seed_descriptionTags();
  let after = Date.now();
  console.log(`PSQL Seeding finished in ${(after - before) / 60000} minutes!`);
} 

timeSeed();

