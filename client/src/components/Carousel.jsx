import React from 'react';
import RestaurantEntry from './RestaurantEntry.jsx';
import styles from './style.css.js';

const Carousel = (props) =>  {
  return (
    <div className="carousel" style={styles.carousel}>
      {props.buttonPrev === false
        ? null
        : <div style={styles.leftArrow} onClick={props.back} id="prevButton" >&lt;</div>
      }
      {props.buttonNext === false
        ? null
        : <div style={styles.rightArrow} onClick={props.next} id="nextButton" >&gt;</div>
      }
      <div className="carouselBody" ref={props.scroll} onScroll={props.scrolling}>
        {props.restaurants.map((restaurant, index) => {
          return (
            <RestaurantEntry restaurant={restaurant} active={props.active} index={index % 3}
            hoverIn={props.hoverIn} hoverOut={props.hoverOut} hover={props.hover}/>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
