const faker = require('faker');
const config = require('./config');
const { Pool, Client } = require('pg');
var pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const db = pgp(config);

const cs = new pgp.helpers.ColumnSet(['rest_id', 'tag_id'], {table: 'restaurant_descriptions'});

async function seed_restaurantDescriptions() {
  let counter = 1;
  let batch = [];

  while (counter <= 1000000) {

    let tags = [];
    let tagCount = 0;
    while (tagCount < 2) {
      let randomTag = faker.random.number({
        min: 1,
        max: 53
      });
      if (tags.indexOf(randomTag) === -1) {
        tags.push(randomTag);
        tagCount++;
      }
    }

    let tag1 = {
      rest_id: counter,
      tag_id: tags[0]
    }

    let tag2 = {
      rest_id: counter,
      tag_id: tags[1]
    }

    batch.push(tag1, tag2);

    if (counter % 10000 === 0) {
      const queryStr = pgp.helpers.insert(batch, cs);

      await db.none(queryStr)
      .then( data => {
        console.log('Batch seeded!')
      })
      .catch( err => {
        if (err) {
          console.log('INSIDE CATCH: ', err)
        }
      });

      batch = [];
    }

    console.log(counter);
    counter++;
  }

}

async function timeSeed () {
  let before = Date.now();
  await seed_restaurantDescriptions();
  let after = Date.now();
  console.log(`PSQL Seeding finished in ${(after - before) / 60000} minutes!`);
} 

timeSeed();

