const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/index.js');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/restaurants/:id/suggestions', (req, res) => {
  db.get(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.status(200).json(data);
  });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
