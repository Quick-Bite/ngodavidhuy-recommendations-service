import React from 'react';
import Tooltip from './Tooltip.jsx'
import styles from './style.css.js';

const TooltipList = (props) => {
  return (
    <div>
    {props.restaurants.map((restaurant, index) => {
      return (
        <Tooltip restaurant={restaurant} hover={props.hover} 
        id={restaurant.id} position={props.position}/>
      )
    })}
    </div>
  );
};

export default TooltipList;
