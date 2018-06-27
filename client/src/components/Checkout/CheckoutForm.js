import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import CustomerInfo from './CustomerInfo';
import API from '../../api/API';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: '$25.00', errors: null };
  }

  // gets user input for each key pressed to an input field
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = (event, customer) => {
    event.preventDefault();
    console.log('SUBMIT:', customer);
    const errors = {};
    const phoneCheck = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
    const emailCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    if (!this.state.firstName) {
      errors.firstName = 'Please provide your first name.';
    }
    if (this.state.firstName && this.state.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    if (!this.state.lastName) {
      errors.lastName = 'Please provide your last name.';
    }
    if (this.state.lastName && this.state.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    if (!emailCheck.test(this.state.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!phoneCheck.test(this.state.phone)) {
      errors.phone = 'Please provide a valid US phone number.';
    }

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.

    if (!Object.values(errors).length) {
      this.props.stripe
        .createToken({ name: `${customer.firstName} ${customer.lastName}` })
        .then(({ token }) => {
          console.log('Received Stripe token:', token);
          if (token) {
            this.setState({ errors: null });
            customer.token = token.id;
            API.getMoney(customer);
          } else {
            errors.card = 'Your card number is incomplete.';
            this.setState({ errors });
          }
        });
    }
    this.setState({ errors });
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
        <fieldset>
          <CustomerInfo name="firstName" type="text" label="First Name" />
          <CustomerInfo name="lastName" type="text" label="Last Name" />
          <CustomerInfo name="email" type="email" label="Email" />
          <CustomerInfo
            name="phone"
            type="tel"
            label="Phone"
            border="border-bottom-0"
          />
        </fieldset>
        <fieldset>
          <CardSection />
        </fieldset>
        <button className="payment-btn">Pay {this.state.total} </button>
        {state.errors
          ? Object.values(state.errors).map(a => (
              <p key={a} className="text-danger text-center my-1">
                {a}
              </p>
            ))
          : null}
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
