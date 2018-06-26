import React from 'react';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

const Checkout = () => (
  <Elements>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
