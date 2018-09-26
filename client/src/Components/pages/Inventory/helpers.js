import API from '../../../api/API';

export const checkToken = function() {
  API.checkToken()
    .then(res => this.setState({ isAuthed: true, isAdmin: res.data.isAdmin }))
    .catch(err => {
      console.log(err);
    });
};

// saves the product to the users cart.
export const handleFormSubmit = function(event, func) {
  // prevents adding 0 items of something or too many
  if (
    this.state.quantity > 0 &&
    this.state.quantity <= parseInt(this.props.cardQuantity)
  ) {
    event.preventDefault();
    // grabs the values needed for the product to save to the cart
    const obj = {};
    obj.ProductId = event.target.getAttribute('data-id');
    obj.qty = this.state.quantity;
    obj.CartId = sessionStorage.getItem('activeCart');
    obj.maxQty = event.target.getAttribute('data-maxqty');
    obj.userId = sessionStorage.getItem('userId');

    API.saveProduct(obj)
      .then(result => {
        console.log(result.data);
        func(result.data);
        this.setState({ success: 'Success' });
        this.reset();
      })
      .catch(error => {
        console.log(error);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.setState({ error: err });
        this.reset();
      });
  } else {
    this.setState({ error: 'Please choose a valid quantity' });
    this.reset();
  }
};

export const reset = () =>
  setTimeout(() => this.setState({ success: null, error: null, quantity: 0 }), 3000);
