const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = function(newCharge) {
  // creates a new customer to send to stripe
  return new Promise((resolve, reject) => {
    stripe.customers
      .create({
        email: newCharge.email,
        source: newCharge.token
      })
      .then(customer => {
        stripe.charges.create({
          amount: newCharge.total.replace(/\D/g, ''),
          description: 'Test charge',
          currency: 'usd',
          customer: customer.id,
          receipt_email: newCharge.email
        });
      })
      .then(() => resolve('PAYMENT SUCCESS'))
      .catch(err => reject(err.message));
  });
};
