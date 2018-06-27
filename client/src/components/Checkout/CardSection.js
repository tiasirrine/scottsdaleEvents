import React from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = props => (
  <div className="input-wrapper">
    <CardElement
      onChange={props.onChange}
      style={{
        base: {
          fontWeight: 500,
          fontSize: '16px',
          fontSmoothing: 'antialiased'
        }
      }}
    />
  </div>
);

export default CardSection;
