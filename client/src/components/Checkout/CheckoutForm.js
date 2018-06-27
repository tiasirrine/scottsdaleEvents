import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import CustomerInfo from './CustomerInfo';
import API from '../../api/API';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '$25.00'
    };
  }

  onChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim()
    });
  };

  handleSubmit = (event, customer) => {
    event.preventDefault();
    console.log('SUBMIT:', customer);

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: `${customer.firstName} ${customer.lastName}` })
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        customer.token = token.id;
        // contactInfo.token = token.id
        API.getMoney(customer);
      });
  };

  render() {
    const state = this.state;
    console.log('STATE:', state);
    return (
      <form
        className="Checkout"
        autoComplete="off"
        onChange={this.onChange}
        onSubmit={event => this.handleSubmit(event, state)}
      >
        <CardSection />
        <CustomerInfo name="firstName" type="text" label="First Name" />
        <CustomerInfo name="lastName" type="text" label="Last Name" />
        <CustomerInfo name="email" type="email" label="Email" />
        <CustomerInfo name="Phone" type="tel" label="Phone" />
        <button className="payment-btn">Pay {this.state.total} </button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
