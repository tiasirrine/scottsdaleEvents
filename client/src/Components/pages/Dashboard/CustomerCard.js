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
      unauthorized: false,
      confirmDelete: false
    };
  }

  // used to reveal a form to modify a customer
  modifyClick = () => this.setState({ modify: !this.state.modify });

  // used to set the state.suspended value to true when updating a customer
  suspendClick = () => this.setState({ suspend: !this.state.suspend });

  // reveals a delete confirmation
  firstDeleteClick = () => this.setState({ confirmDelete: true });

  // deletes the user in the db, and removes the user from the state of the ViewCustomer component
  secondDeleteClick = () => {
    const { id } = this.props.customer;
    API.deleteCustomer(id)
      .then(result => {
        this.props.deleteCustomer(id);
      })
      .catch(err => {
        console.log(err);
        if (err.response.status) {
          if (err.response.status === 401) {
            this.props.checkAuth(true);
          }
        }
      });
  };

  // used to hide the delete confirmation
  denyDeleteClick = () => this.setState({ confirmDelete: false });

  // updates a customer
  submitClick = () => {
    const customer = {};
    customer.firstName = this.state.firstName;
    customer.lastName = this.state.lastName;
    customer.company = this.state.company;
    customer.email = this.state.email;
    customer.id = this.props.customer.id;

    // checks for null form values
    if (!checkNull(customer)) {
      this.setState({ result: 'All fields must be completed' });
      return;
    }

    // set the suspended value here, since its ok for it to be false.
    // if set above the checkNull function, checkNull will return false each time
    customer.suspend = this.state.suspend;

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
      .catch(err => {
        console.log(err.response);
        if (err.response.status) {
          if (err.response.status === 401) {
            this.props.checkAuth(true);
          }
        }
        this.setState({ result: 'An error occured' });
      });
  };

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            Name: {this.state.firstName} {this.state.lastName}
          </CardTitle>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <p>Customer ID: {this.props.customer.id}</p>
            <p>Email: {this.state.email} </p>
            <p>Company: {this.state.company}</p>
          </div>
          <p>Status: {!this.state.suspend ? 'Active' : 'Suspended'}</p>
          <div>
            <Button onClick={this.modifyClick}>{!this.state.modify ? 'Modify' : 'Hide'}</Button>
            <Button onClick={this.firstDeleteClick}>Delete</Button>
            {this.state.confirmDelete && (
              <p>
                Are you sure?{' '}
                <span
                  className="text-success p-2"
                  style={{ cursor: 'pointer' }}
                  onClick={this.secondDeleteClick}
                >
                  Yes{' '}
                </span>{' '}
                <span
                  onClick={this.denyDeleteClick}
                  className="text-danger p-2"
                  style={{ cursor: 'pointer' }}
                >
                  No
                  {}
                </span>
              </p>
            )}
            {this.deleteResult && <p>{this.deleteResult}</p>}
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
                  label="Email"
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
