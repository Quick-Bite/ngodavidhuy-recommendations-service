DROP TABLE restaurants;

CREATE TABLE restaurants (
  _id serial PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  food VARCHAR(50) NOT NULL,
  wait_time INT NOT NULL,
  price_range INT NOT NULL,
  review_count INT NOT NULL,
  star_rating INT NOT NULL,
  good_rating INT NOT NULL,
  delivery_rating INT NOT NULL,
  accurate_rating INT NOT NULl,
  username_featured TEXT NOT NULL,
  review_featured TEXT NOT NULL,
  picture TEXT NOT NULL,
  region INT NOT NULL,
  bookmarked BOOLEAN
);

CREATE INDEX region_index ON restaurants (region);



