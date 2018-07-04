import React from 'react';

const Footer = props => (
  <section>
    <div id="footer">
      <div className="container">
        <div className="row">
          <div
            className="col-md-4 rights text-left wow fadeInRight"
            data-wow-offset="10"
            data-wow-duration="3s"
          >
            <h4>© 2018 ecologytheme. All rights reserved.</h4>
          </div>
          <div className="col-md-4 wow fadeInUp" data-wow-offset="10" data-wow-duration="3s">
            <a href="index.html">
              <img src="images/logo.png" alt="" />
            </a>
          </div>
          <div
            className="col-md-4 credit text-right wow fadeInLeft"
            data-wow-offset="10"
            data-wow-duration="3s"
          >
            <h4>
              Made by <span>ecologytheme!</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
