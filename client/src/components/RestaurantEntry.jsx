import React from 'react';
import Stars from './Stars.jsx';
import Bookmark from './Bookmark.jsx';
import styles from './style.css.js';

const RestaurantEntry = (props) => {
  return (
    <div className="restaurantCard">
      <div style={styles.card}>
        <a href={`/restaurants/${props.restaurant._id}`} style={{ textDecoration: 'none' }}>
          <div style={styles.cardImage} onMouseEnter={props.hoverOut}>
            <img className="restaurantPic" width="255" src={props.restaurant.picture} />
          </div>
        </a>
        <div style={styles.bookmark}>
          <Bookmark bookmarked={props.restaurant.bookmarked}/>
        </div>
        <a href={`/restaurants/${props.restaurant._id}`} style={{ textDecoration: 'none' }}>
          <div style={styles.cardInfo} onMouseEnter={props.hoverOut}>
            <h3 className="name" style={Object.assign({}, styles.listInfoLeft, styles.title, styles.ellipsis)}>{props.restaurant.name}</h3>
            <div style={Object.assign({}, styles.listInfoLeft, { marginBottom: '10px' })}>
              <span className="cuisine">{props.restaurant.description_tags.join(', ').concat('...')}</span>        
            </div>
            <div style={styles.lowerRow}>
              <div>
                <span>
                  <div className="waitingTime" style={{ color: 'black', margin: '2px 0' }}>{props.restaurant.wait_time}-{props.restaurant.wait_time + 10} mins</div>
                  <div className="minOrder">${props.restaurant.minimum_price} min</div>
                </span>
              </div>
              <div onMouseEnter={(e) => props.hoverIn(props.restaurant._id, e)}>
                <Stars stars={props.restaurant.ratings.star_rating}/>
                <div className="reviewNos">{props.restaurant.review_count} ratings</div>
              </div>
            </div>
          </div>
        </a>
      </div> 
    </div>
  );
};

export default RestaurantEntry;
