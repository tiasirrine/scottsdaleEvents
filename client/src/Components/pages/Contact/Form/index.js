import React from 'react';

export default class Form extends React.Component {
  state = {
    name: '',
    companyName: '',
    email: '',
    number: '',
    message: ''
  };

  onSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <form>
        <div className="container">
          <div className="form-group">
            <label forhtml="exampleFormControlInput1">Name</label>
            <input
              type="Name"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label forhtml="exampleFormControlInput1">Company Name</label>
            <input
              type="companyName"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Comapny"
              value={this.state.companyName}
              onChange={e => this.setState({ companyName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label forhtml="exampleFormControlInput1">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label forhtml="exampleFormControlInput1">Phone Number</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="888-888-8888"
              value={this.state.number}
              onChange={e => this.setState({ number: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label forhtml="exampleFormControlTextarea1">Message For Scottsdale Events Decor</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-light" onClick={() => this.onSubmit()}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
