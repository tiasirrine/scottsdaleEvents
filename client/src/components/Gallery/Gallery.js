import React from 'react';

const Gallery = props => (
  <section id="portfolio">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h5>portfolio</h5>
          <h2>My Featured Work</h2>
        </div>
      </div>
      <div class="row">
        <div class="portfolio-wrapper col-md-12">
          <div class="filter-buttons">
            <div class="button-group filters-button-group">
              <button class="button is-checked" data-filter="*">
                All
              </button>
              <button class="button" data-filter=".ct1">
                Web Design
              </button>
              <button class="button" data-filter=".ct2">
                Motion Graphic
              </button>
              <button class="button" data-filter=".ct3">
                llustration
              </button>
              <button class="button" data-filter=".ct4">
                Photography
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="row">
          <div class="col-md-4 grid-item ct3 ct4">
            <div class="single-portfolio-item">
              <a href="">
                <img src="images/p1.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p1.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
          <div class="col-md-4 grid-item ct1">
            <div class="single-portfolio-item ">
              <a href="">
                <img src="images/p2.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p2.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
          <div class="col-md-4 grid-item ct3">
            <div class="single-portfolio-item">
              <a href="">
                <img src="images/p3.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p3.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 grid-item ct2 ct3 ct4">
            <div class="single-portfolio-item">
              <a href="">
                <img src="images/p4.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p4.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
          <div class="col-md-4 grid-item ct1">
            <div class="single-portfolio-item ">
              <a href="">
                <img src="images/p5.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p5.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
          <div class="col-md-4 grid-item ct2 ct3 ct4">
            <div class="single-portfolio-item">
              <a href="">
                <img src="images/p6.png" alt="" />
              </a>
            </div>
            <div class="search">
              <a href="images/p6.png" class="port-view">
                <i class="fas fa-search-plus" />
              </a>
            </div>
            <div class="description d-flex">
              <p>
                Rappox Template<br />
                <span>Html template design.</span>
              </p>
              <i class="far fa-heart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
