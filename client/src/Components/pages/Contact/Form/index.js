import React from 'react';

export default class Form extends React.Component {
  state = {
    name: '',
    companyName: '',
    email: '',
    number: '',
    message: ''
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
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Company Name</label>
            <input
              type="companyName"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Comapny"
              value={this.state.companyName}
              onChange={e => this.setState({ companyName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              type="Number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="888-888-8888"
              value={this.state.number}
              onChange={e => this.setState({ number: e.target.value })}
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Message For Scottsdale Events Decor</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-light" onClick>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
