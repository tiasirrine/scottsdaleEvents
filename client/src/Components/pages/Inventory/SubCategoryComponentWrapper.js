import React from 'react';
import { Link } from 'react-router-dom';

const SubCategoryComponentWrapper = props => {
  const { inventory, image } = props;

  // grabs the current path
  const param = props.match.params.category;

  // will contain the subcategories, if there are any
  const subCategories = [];

  // grabs the sub categories. Even though this "isn't being used", its needed for getInvItems
  const getSubCategories = inventory
    ? inventory[param].map(a => {
        if (!subCategories.includes(a.subcategory)) {
          subCategories.push(a.subcategory);
        }
      })
    : null;

  // checks if there are no sub categories. if not, gets the inventory items.
  const getInvItems = subCategories.includes('')
    ? inventory[param].map(a => a.name)
    : null;

  // contains individual inventory items if there are no sub categories
  const itemsToRender = subCategories.length ? subCategories : null;

  return (
    <div className="container-fluid">
      <div className="row">
        {itemsToRender && !getInvItems
          ? itemsToRender.map(a => (
              <div key={a}>
                <Link to={`${props.match.url}/${a}`}>
                  <img className="image" src={image} />
                  <p>{a}</p>
                </Link>
              </div>
            ))
          : null}
        {getInvItems
          ? getInvItems.map((a, i) => (
              <div key={i}>
                <Link to={`${props.match.url}/${a}`}>
                  <img className="image" src={image} />
                  <p>{a}</p>
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SubCategoryComponentWrapper;
