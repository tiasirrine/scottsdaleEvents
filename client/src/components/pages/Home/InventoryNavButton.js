import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InventoryNavButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category } = props;

    return (
      <li className="nav-item">
        <Link to={`/invenory/${category}`} className="nav-link " role="button">
          {category}
        </Link>
      </li>
    );
  }
}

export default InventoryNavButton;

// <div className="dropdown-menu" aria-labelledby="navbarDropdown" />

// <li className="nav-item dropdown">
//   <a
//     className="nav-link dropdown-toggle"
//     href=""
//     id="navbarDropdown"
//     role="button"
//     data-toggle="dropdown"
//     aria-haspopup="true"
//     aria-expanded="false"
//   >
//     {category}
//   </a>
//   <div className="dropdown-menu" aria-labelledby="navbarDropdown" />
// </li>

// {
//   subCategories.map(subCategory => (
//     <a key={subCategory} className="dropdown-item" href="">
//       {subCategory}
//     </a>
//   ))
// }
