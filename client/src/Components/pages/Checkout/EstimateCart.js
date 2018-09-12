/* eslint-disable */
import React from 'react';
import { Card, CardBody, Table } from 'mdbreact';
import './Checkout.css';

export default class EstimateCart extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          {' '}
          <h3 className="text-center mb-3">Cart</h3>{' '}
          <Table>
            <thead className="blue-grey lighten-4">
              <tr>
                <th className="text-left">
                  <b>Items</b>
                </th>
                <th className="text-center">
                  <b>Quantity</b>
                </th>
                <th className="text-center">
                  <b>Price</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td className="text-left">{obj.name}</td>
                    <td className="text-center">{obj.qty}</td>
                    <td className="text-center">${obj.total}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="text-center">{''} </td>
                <td className="text-center">{''} </td>
                <td className="text-center">
                  <b style={{ fontWeight: '600' }}>
                    Est. Subtotal: $
                    {this.props.cart.reduce((a, b) => a + parseInt(b.total), 0)}{' '}
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
