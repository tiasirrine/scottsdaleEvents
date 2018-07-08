import React, { Component } from 'react';

class InventoryNavButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category, subCategories } = props;

    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href=""
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {category}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {subCategories.map(subCategory => (
            <a key={subCategory} className="dropdown-item" href="">
              {subCategory}
            </a>
          ))}
        </div>
      </li>
    );
  }
}

export default InventoryNavButton;
