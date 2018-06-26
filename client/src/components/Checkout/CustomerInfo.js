import React from 'react';
import { PostalCodeElement } from 'react-stripe-elements';

const CustomerInfo = props => (
  <div>
    <label className="card-label">{props.label}</label>
    <input
      className="cst-input"
      type={props.type}
      name={props.name}
      placeholder={props.label}
      required=""
    />
  </div>
);

export default CustomerInfo;
