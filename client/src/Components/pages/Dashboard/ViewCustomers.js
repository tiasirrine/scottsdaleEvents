import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody, CardTitle } from 'mdbreact';
import API from '../../../api/API';
import CustomerCard from './CustomerCard';
// import { checkEmail, checkNull, handleInputChange } from '../../../api/validate';

const styles = {
  h2: {
    marginTop: '20px',
    marginLeft: '20px',
    marginBottom: '30px'
  }
};

export default class ViewCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = { allCustomers: null, modify: false };
  }

  componentDidMount() {
    this.getAllCustomers();
  }

  getAllCustomers = () => {
    API.getCustomers()
      .then(result => {
        const { success, error } = result.data;
        if (success) {
          this.setState({ allCustomers: success });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteClick = e => {
    console.log(e);
  };

  modifyClick = () => this.setState({ modify: !this.state.modify });

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <div className="hideIcon">
          <i onClick={this.props.toggleSideBar} className="fa fa-bars icon" />
        </div>
        <Container>
          <Row>
            <div style={styles.h2}>
              <h2>View and modify your customers</h2>
            </div>
            <Col md="8" className="offset-md-2">
              {this.state.allCustomers &&
                this.state.allCustomers.map(a => <CustomerCard key={a.email} customer={a} />)}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
