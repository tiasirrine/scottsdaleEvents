import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import InventoryNavButton from './InventoryNavButton';
import API from '../../api/API';

class InventoryNav extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { categories: this.loadCategories() };
  // }

  // loadCategories = () => {
  //   return API.getInventoryCategories()
  //     .then(result => {
  //       const arr = result.data.map(index => index['CATEGORY']);
  //       return this.setState({ categories: arr });
  //     })
  //     .catch(error => error);
  // };

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
