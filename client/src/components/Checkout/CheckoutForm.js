import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import CustomerInfo from './CustomerInfo';
import API from '../../api/API';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: '$25.00', errors: {}, loading: false };
  }

  // gets user input for each key pressed to an input field
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value.trim() });
  };

  // used to check if a card has been filled out or not
  onCardChange = element => {
    console.log(element.complete);
    // sets the state as true or false based on if the card is filled out
    // if the card is not filled out, then the form wont submit,
    // and a message displays to the user
    this.setState({ incompleteCard: element.complete });
  };

  // form submission
  handleSubmit = event => {
    event.preventDefault();
    const customer = this.state;
    const errors = {};
    const phoneCheck = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
    const emailCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    // form validation and custom messages based on error
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
    // this.onCardChange checks if a card is completed or not, and updates state
    if (!this.state.incompleteCard) {
      errors.card = 'Your card number is incomplete.';
    }

    // only attempts to charge the card if the form is properly filled out
    // does this by checking if any errors are on the error object
    if (!Object.values(errors).length) {
      // if the form submits, then an attempt to charge the card occurs
      // the attempt to charge the card takes an unknown amount of time to complete
      // if set to true, the dom renders a loading circle while waiting for the result
      this.setState({ loading: true });

      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      // the token is used to complete the payment. generated based on the public stripe key
      // authenticated against the private stripe key on the server
      this.props.stripe
        .createToken({ name: `${customer.firstName} ${customer.lastName}` })
        .then(({ token }) => {
          // console.log('Received Stripe token:', token);
          if (token) {
            customer.token = token.id;
            // sends the token to the server to make a payment
            // handle success and errors when making payments
            API.getMoney(customer)
              .then(success =>
                this.setState({
                  success: success.data,
                  loading: false,
                  errors: {}
                })
              )
              .catch(paymentErr =>
                this.setState({ paymentErr: paymentErr.data })
              );
          } else {
            this.setState({ paymentErr: 'An error occured.' });
          }
        })
        .catch(err => console.log(err));
    }
    // updates state with any validation errors that may have occured when submitting the form
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
        onSubmit={this.handleSubmit}
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
          <CardSection onChange={this.onCardChange} />
        </fieldset>
        <button className="payment-btn">Pay {this.state.total} </button>
        {state.errors
          ? Object.values(state.errors).map(a => (
              <p key={a} className="text-danger text-center my-1">
                {a}
              </p>
            ))
          : null}
        {state.success ? (
          <p className="text-success text-center my-1">{state.success}</p>
        ) : null || state.paymentErr ? (
          <p className="text-danger text-center my-1">{state.paymentErr}</p>
        ) : null}
        {state.loading ? <div className="loader" /> : null}
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
