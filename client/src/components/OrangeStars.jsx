import React from 'react';
import styles from './style.css.js';

const OrangeStars = (props) => {
  const width = Math.ceil(props.stars / 10) * 10;
  const style = {
    width: `${width}%`
  };
  return (
    <div style={Object.assign({}, styles.orangeStars, style)}>
      <span className="orangeStars">★</span>
      <span className="orangeStars">★</span>
      <span className="orangeStars">★</span>
      <span className="orangeStars">★</span>
      <span className="orangeStars">★</span>
    </div>
  );
};

export default OrangeStars;
