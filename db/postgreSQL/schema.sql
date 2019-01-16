DROP TABLE restaurants;

CREATE TABLE restaurants (
  _id serial PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  city INT NOT NULL,
  price_range INT NOT NULL,
  tag1 VARCHAR(25) NOT NULL,
  tag2 VARCHAR(25) NOT NULL,
  min_price INT NOT NULL,
  wait_time INT NOT NULL,
  review_count INT NOT NULL,
  star_rating INT NOT NULL,
  food_rating INT NOT NULL,
  delivery_rating INT NOT NULL,
  order_accuracy_rating INT NOT NULl,
  featured_review TEXT NOT NULL,
  featured_username TEXT NOT NULL,
  picture TEXT NOT NULL,
  bookmarked BOOLEAN NOT NULL
);

CREATE INDEX multi_idx ON restaurants (city, price_range, tag1, tag2);
