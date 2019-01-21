const mongoose = require('mongoose');
const config = require('../config').db;
const mongoURI = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.db_name}`
const db = mongoose.connect(mongoURI, {useNewUrlParser: true, poolSize: 10});

db
  .then( () => console.log(`Connected to: ${mongoURI}`))
  .catch( err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

module.exports = db;
