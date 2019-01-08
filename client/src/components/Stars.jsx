import React from 'react';
import GreyStars from './GreyStars.jsx';
import OrangeStars from './OrangeStars.jsx';
import styles from './style.css.js';

const Stars = (props) => {
  return (
    <div style={styles.stars} >
      <GreyStars />
      <OrangeStars stars={props.stars}/>
    </div>
  );
};

export default Stars;
