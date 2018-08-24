import React, { Component } from 'react';
import { Input, Button, Card, CardBody, CardTitle } from 'mdbreact';
import { checkEmail, checkNull, handleInputChange } from '../../../api/validate';
import API from '../../../api/API';

export default class CustomerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      firstName: this.props.customer.firstName,
      lastName: this.props.customer.lastName,
      company: this.props.customer.company,
      email: this.props.customer.email,
      suspend: this.props.customer.suspend,
      result: null,
      unauthorized: false
    };
  }

  deleteClick = e => {
    console.log(e);
  };

  modifyClick = () => this.setState({ modify: !this.state.modify });

  suspendClick = () => this.setState({ suspend: this.state.suspend ? false : true });

  submitClick = () => {
    const { result, unauthorized, modify, suspend, ...customer } = this.state;

    customer.id = this.props.customer.id;
    if (!checkNull(customer)) {
      this.setState({ result: 'All fields must be completed' });
      return;
    }

    customer.suspend = suspend;

    if (!checkEmail(customer.email)) {
      this.setState({ result: 'Please enter a valid email address' });
      return;
    }

    API.updateCustomer(customer)
      .then(result => {
        const { success, error } = result.data;
        if (success) {
          this.setState({ result: success, ...customer });
        } else {
          this.setState({ result: error });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ result: 'An error occured' });
      });
  };

  render() {
    const { customer } = this.props;
    console.log(this.state);
    return (
      <Card key={this.state.email}>
        <CardBody>
          <CardTitle>
            Name: {this.state.firstName} {this.state.lastName}
          </CardTitle>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <p>Customer ID: {this.state.id}</p>
            <p>Email: {this.state.email} </p>
            <p>Company: {this.state.company}</p>
          </div>
          <p>Status: {!this.state.suspend ? 'Active' : 'Suspended'}</p>
          <div className="">
            <Button onClick={this.modifyClick}>{!this.state.modify ? 'Modify' : 'Hide'}</Button>
            <Button onClick={this.deleteClick}>Delete</Button>
          </div>
          {this.state.modify && (
            <form>
              <div className="grey-text">
                <Input
                  name="firstName"
                  label="First name"
                  icon="user"
                  group
                  type="text"
                  value={this.state.firstName}
                  onChange={handleInputChange.bind(this)}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  icon="user"
                  group
                  type="text"
                  value={this.state.lastName}
                  onChange={handleInputChange.bind(this)}
                />
                <Input
                  name="company"
                  label="Company Name"
                  icon="pencil"
                  group
                  type="text"
                  value={this.state.company}
                  onChange={handleInputChange.bind(this)}
                />
                <Input
                  name="email"
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  value={this.state.email}
                  onChange={handleInputChange.bind(this)}
                />
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    defaultChecked={this.state.suspend}
                    onChange={this.suspendClick}
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlValidation1"
                    required
                  />
                  <label className="custom-control-label" htmlFor="customControlValidation1">
                    Suspend Customer
                  </label>
                </div>
              </div>
              <div>
                <Button color="primary" name="update-profile" onClick={this.submitClick}>
                  Update Customer
                </Button>
                {this.state.result && <p>{this.state.result}</p>}
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    );
  }
}
