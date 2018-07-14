import React from 'react';

export default class Form extends React.Component {
  state = {
    name: '',
    companyName: '',
    Email: '',
    Number: '',
    Message: ''
  };

  render() {
    return (
      <form>
        <div className="container">
          <div className="form-group">
            <label for="exampleFormControlInput1">Name</label>
            <input
              type="Name"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Company Name</label>
            <input
              type="companyName"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Comapny"
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              type="Number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="888-888-8888"
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Message For Scottsdale Events Decor</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" />
          </div>
          <button type="submit" className="btn btn-light">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
