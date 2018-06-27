import React from 'react';
import { PostalCodeElement } from 'react-stripe-elements';

const CustomerInfo = props => (
  <div className={`input-wrapper input-border ${props.border}`}>
    <label className="input-label">{props.label}</label>
    <input
      className="payment-input"
      type={props.type}
      name={props.name}
      placeholder={props.label}
      required=""
    />
  </div>
);

export default CustomerInfo;
