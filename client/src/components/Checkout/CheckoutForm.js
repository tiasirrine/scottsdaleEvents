import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import CustomerInfo from './CustomerInfo';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '$25.00'
    };
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    return (
      <form
        className="Checkout"
        autoComplete="off"
        onSubmit={this.handleSubmit}
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
