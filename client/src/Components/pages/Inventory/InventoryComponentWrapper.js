import React, { Fragment } from 'react';
import { Container } from 'mdbreact';
import InventoryCard from './InventoryCard';

const InventoryComponentWrapper = props => {
  const { inventory, categories, image } = props;

  // grabs the current path
  const categoryParam = props.match.params.category;
  const subCategoryParam = props.match.params.subcategory;

  // gets the inventory items for the sub category
  const getInvItems = inventory
    ? inventory[categoryParam]
        .map(a => {
          if (a.subcategory === subCategoryParam) {
            return a;
          }
        })
        .filter(a => a !== undefined)
    : null;

  return (
    <Fragment>
      {getInvItems
        ? getInvItems.map((a, i) => {
            return (
              <InventoryCard
                key={i}
                cardTitle={a.name}
                cardDesc={a.description}
                cardPrice={a.price}
                id={a.id}
                url={a.url}
              />
            );
          })
        : null}
    </Fragment>
  );
};

export default InventoryComponentWrapper;
