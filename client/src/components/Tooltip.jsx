
import React from 'react';
import styles from './style.css.js';

const Tooltip = (props) => {
  const position = {
    left: props.position[0],
    top: props.position[1],
  }
  const style = props.hover === props.id
    ? Object.assign({}, styles.tooltipBody, styles.tooltipBodyActive, position)
    : styles.tooltipBody;

  return (
    <div style={style}>
      <p>Here's what people are saying:</p>
      <div className="summary" style={styles.reviewSummary}>
        <div>
          <h4 style={styles.title}>{props.restaurant.reviewSummary.good}%</h4>
          <span>Food was</span>
          <br/>
          <span>good</span>
        </div>
        <div style={styles.reviewBorder}>
          <h4 style={styles.title}>{props.restaurant.reviewSummary.onTime}%</h4>
          <span>Delivery was</span>
          <br/>
          <span>on time</span>
        </div>
        <div>
        <h4 style={styles.title}>{props.restaurant.reviewSummary.accurate}%</h4>
          <span>Order was</span>
          <br/>
          <span>accurate</span>
        </div>
      </div>
      <div className="review" style={styles.review}>
        <div className="avatar" style={styles.avatar}>{props.restaurant.review.username[0]}</div>
        <div style={styles.reviewContent}>
          <h4 style={{margin: '10px 0'}}>{props.restaurant.review.username}:</h4>
          <div>{props.restaurant.review.review}</div>
        </div>
      </div>
      <div style={{ padding: '20px' }}> 
        <a href="" style={styles.tooltipLink}>All Reviews ({props.restaurant.reviewNo})</a>
      </div>
    </div>
  );
}

export default Tooltip;
