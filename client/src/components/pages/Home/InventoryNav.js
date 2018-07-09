import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import InventoryNavButton from './InventoryNavButton';

class InventoryNav extends Component {
  //TODO: api call to get sub categories of each category

  render() {
    const { categories } = this.props;

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light inventory-nav">
        <div className="container ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#inventory-nav"
            aria-controls="inventory-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="inventory-nav">
            <ul className="navbar-nav m-auto">
              {categories.length
                ? categories.map((category, index, categories) => (
                    <InventoryNavButton key={category} category={category} />
                  ))
                : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default InventoryNav;

// { subCategories = { subCategories[index][category] } }
