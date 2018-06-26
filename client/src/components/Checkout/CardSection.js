import React from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = () => (
  <div>
    <label className="card-label">Card details</label>
    <CardElement />
  </div>
);

export default CardSection;
