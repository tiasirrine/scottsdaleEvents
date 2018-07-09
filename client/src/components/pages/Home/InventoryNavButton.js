import React, { Component } from 'react';

class InventoryNavButton extends Component {
  state = {};
  render() {
    const { props } = this;
    const { category } = props;

    return (
      <li className="nav-item">
        <a className="nav-link " href="" role="button">
          {category}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown" />
      </li>
    );
  }
}

export default InventoryNavButton;

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
