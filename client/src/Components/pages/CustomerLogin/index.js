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
      <section class="container form-elegant">
        <div class="card">
          <div class="card-body mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5">
                <strong>Sign in</strong>
              </h3>
            </div>

            <div class="md-form">
              <input type="text" id="Form-email1" class="form-control" />
              <label for="Form-email1">Your email</label>
            </div>

            <div class="md-form pb-3">
              <input type="password" id="Form-pass1" class="form-control" />
              <label for="Form-pass1">Your password</label>
              <p class="font-small blue-text d-flex justify-content-end">
                Forgot{' '}
                <a href="#" class="blue-text ml-1">
                  {' '}
                  Password?
                </a>
              </p>
            </div>

            <div class="text-center mb-3">
              <button
                type="button"
                class="btn blue-gradient btn-block btn-rounded z-depth-1a"
              >
                Sign in
              </button>
            </div>
            <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
              {' '}
              or Sign in with:
            </p>

            <div class="row my-3 d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-white btn-rounded mr-md-3 z-depth-1a"
              >
                <i class="fa fa-facebook blue-text text-center" />
              </button>
              <button
                type="button"
                class="btn btn-white btn-rounded mr-md-3 z-depth-1a"
              >
                <i class="fa fa-twitter blue-text" />
              </button>
              <button
                type="button"
                class="btn btn-white btn-rounded z-depth-1a"
              >
                <i class="fa fa-google-plus blue-text" />
              </button>
            </div>
          </div>

          <div class="modal-footer mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">
              Not a member?{' '}
              <a href="#" class="blue-text ml-1">
                {' '}
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
export default CustomerLogin;
