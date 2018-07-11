import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  // Row,
  Col
} from 'reactstrap';

class CustomerLogin extends Component {
  render() {
    return (
      <Container>
        <Form>
          <FormGroup row>
            <Col sm={12}>
              <Label for="customer-email">Email</Label>
              <Input
                type="email"
                name="customer-email"
                id="customer-email"
                placeholder="with a placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Label for="customer-password">Password</Label>
              <Input
                type="password"
                name="customer-password"
                id="customer-password"
                placeholder="password placeholder"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default CustomerLogin;
