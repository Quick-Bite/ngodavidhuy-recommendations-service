// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'localhost');
const newrelic = require('newrelic');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const restaurant = require('./controllers/restaurant');
const template = require('./template/template.js');

  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send(template(id));
  });
   
  // app.get('/restaurants/:id/suggestions', (req, res) => {
  //   if (!req.params.id) {
  //     res.status(400).send("No restaurant ID provided");
  //   } else {
  //     restaurant.getSuggestionsCached(redis, req.params.id, (response) => {
  //       res.status(200).send(response);
  //     });
  //   }
  // });

  app.get('/restaurants/:id/suggestions', restaurant.getSuggestions);
  
  app.post('/restaurants/', restaurant.createNewRestaurant);
  
  app.put('/restaurants/:id', restaurant.updateRestaurant);
  
  app.delete('/restaurants/:id', restaurant.removeExistingRestaurant);
  
  const PORT = 3005;
  app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

