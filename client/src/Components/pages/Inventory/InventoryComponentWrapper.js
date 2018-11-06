import React from 'react';

import InventoryCard from './InventoryCard';

const InventoryComponentWrapper = props => {
	const { inventory, categories } = props;

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
		<div>
			{getInvItems
				? getInvItems.map((a, i) => {
						return (
							<InventoryCard
								key={i}
								cardTitle={a.name}
								cardDesc={a.description}
								cardPrice={a.price}
								cardQuantity={a.quantity}
								id={a.id}
								url={a.url}
								extra={a.extraurl}
							/>
						);
				  })
				: null}
		</div>
	);
};

export default InventoryComponentWrapper;
