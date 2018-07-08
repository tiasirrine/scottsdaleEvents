import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import InventoryNavButton from './InventoryNavButton';

class InventoryNav extends Component {
  state = {
    categories: ['Furniture', 'Bars', 'Lighting'],
    subCategories: [
      { Furniture: ['Tables', 'Chairs', 'Sofas'] },
      { Bars: ['bar1', 'bar2', 'bar3'] },
      { Lighting: ['lights1', 'lights2', 'lights3'] }
    ]
  };

  //TODO: api call to get categories
  //TODO: api call to get sub categories of each category

  render() {
    console.log(this.state);
    const { state } = this;
    const { categories, subCategories } = state;
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
              {categories.map((category, index, categories) => (
                <InventoryNavButton
                  key={category}
                  category={category}
                  subCategories={subCategories[index][category]}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default InventoryNav;
