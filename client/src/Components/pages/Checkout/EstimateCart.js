/* eslint-disable */
import React from 'react';
import { Card, CardBody, Table, Row } from 'mdbreact';
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
              {this.props.cart &&
                this.props.cart.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-left">{obj.name}</td>
                      <td className="text-center">{obj.qty}</td>
                      <td className="text-center">${obj.total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="text-right">
            <div>
              Est Subtotal: $
              {this.props.cart &&
                parseFloat(
                  Math.round(
                    this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) * 100
                  ) / 100
                ).toFixed(2)}{' '}
            </div>
            <div>
              Labor(15%): $
              {this.props.cart &&
                parseFloat(
                  Math.round(
                    this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) *
                      0.15 *
                      100
                  ) / 100
                ).toFixed(2)}{' '}
            </div>
            <div>
              Taxes(8.1%): $
              {this.props.cart &&
                parseFloat(
                  Math.round(
                    this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) *
                      0.081 *
                      100
                  ) / 100
                ).toFixed(2)}{' '}
            </div>
            <div>
              Shipping: $
              {this.props.cart && parseFloat(Math.round(285 * 100) / 100).toFixed(2)}{' '}
            </div>
            <div>_______________</div>
            <div style={{ background: 'transparent', fontWeight: '600' }}>
              $
              {this.props.cart &&
                parseFloat(
                  Math.round(
                    (this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) +
                      this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) *
                        0.15 +
                      this.props.cart.reduce((a, b) => a + parseInt(b.total), 0) *
                        0.081 +
                      285) *
                      100
                  ) / 100
                ).toFixed(2)}{' '}
            </div>
          </div>
          <div className="text-center">{''} </div>
        </CardBody>
      </Card>
    );
  }
}
