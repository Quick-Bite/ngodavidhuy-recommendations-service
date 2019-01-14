# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD Routes

### MongoDB

CREATE:

```sh
db.insertOne({
  _id: ?,
  name: ?,
  description: ?,
  wait_time: ?,
  price_range: ?,
  review_count: ?,
  star_rating: ?,
  good_rating: ?,
  delivery_rating: ?,
  accuracy_rating: ?,
  username: ?,
  review: ?,
  picture: ?,
  region: ?,
  bookmarked: ?
});

```

READ:

```sh
db.restaurants.find({region: ?}).limit(12);
```

UPDATE:

```sh
db.restaurants.update(
  { _id: ? },
  { 
    $inc: { review_count: ? },
    $set: {
      star_rating: ?,
      good_rating: ?,
      delivery_rating: ?,
      ...
      etc
    }
  }
);
```

DELETE:

```sh
db.restaurants.deleteOne( { "_id" : ? } );
```


### PostgreSQL

CREATE:

```sh
INSERT INTO restaurants (_id, description, wait_time, price_range, review_count, star_rating, good_rating, delivery_rating, accuracy_rating, username_featured, review_featured, picture, region, bookmarked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
```

READ:

```sh
SELECT * FROM restaurants WHERE region = ? LIMIT(12);
```

UPDATE:

```sh
UPDATE restaurants SET (? ... ?) = (? ... ?) WHERE _id = ?;
```

DELETE:

```sh
DELETE FROM restaurants WHERE _id = ?;
```


