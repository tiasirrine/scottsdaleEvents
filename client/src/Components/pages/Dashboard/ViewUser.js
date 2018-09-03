import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'mdbreact';
import API from '../../../api/API';
import UserCard from './UserCard';

const styles = {
  h2: {
    marginTop: '20px',
    marginLeft: '20px',
    marginBottom: '30px'
  }
};

export default class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { allUsers: null, error: null };
    this.user = this.props.location.pathname.split('/')[3];
  }

  componentDidMount() {
    if (this.props.location.pathname.includes('customers')) {
      this.getAllCustomers();
    } else {
      this.getAllAdmins();
    }
  }

  // this function gets passed down as a prop into the UserCard component
  // to update the state of this component when a customer is deleted so that
  // the customer is removed on the page right away
  deleteUser = id => {
    const updatedUsers = this.state.allUsers.filter(a => a.id !== id);
    this.setState({ allUsers: updatedUsers });
  };

  getAllAdmins = () => {
    API.getAdmins()
      .then(result => {
        const { success } = result.data;
        const removeActiveUser = success.filter(a => a.id !== this.props.user.id);
        this.setState({ allUsers: removeActiveUser });
      })
      .catch(error => {
        const err = error.message
          ? 'Connection timed out'
          : error.response.data.message;
        if (err.response && err.response.status === 401) {
          this.props.checkAuth(true);
        } else {
          this.setState({ error: err });
        }
      });
  };

  // loads all customers when the component mounts
  getAllCustomers = () => {
    API.getCustomers()
      .then(result => {
        const { success } = result.data;
        if (success) {
          this.setState({ allUsers: success });
        }
      })
      .catch(error => {
        const err = error.message
          ? 'Connection timed out'
          : error.response.data.message;
        if (err.response && err.response.status === 401) {
          this.props.checkAuth(true);
        } else {
          this.setState({ error: err });
        }
      });
  };

  render() {
    if (this.state.allUsers === null && this.state.error === null) {
      return <div className="loader" />;
    }

    return (
      <Fragment>
        <div className="hideIcon">
          <i onClick={this.props.toggleSideBar} className="fa fa-bars icon" />
        </div>
        <Container>
          <Row>
            <div style={styles.h2}>
              <h2>View and modify your {this.user}</h2>
              <h3 className="text-danger text-center">{this.state.error}</h3>
            </div>
            <Col md="8" className="offset-md-2">
              {this.state.allUsers &&
                this.state.allUsers.map(a => (
                  <UserCard
                    key={a.email}
                    user={a}
                    deleteUser={this.deleteUser}
                    checkAuth={this.props.checkAuth}
                    userType={this.user}
                  />
                ))}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
