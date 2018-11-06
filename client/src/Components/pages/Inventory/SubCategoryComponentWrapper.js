import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, Col, Row, View } from 'mdbreact';

import InventoryCard from './InventoryCard';

const SubCategoryComponentWrapper = props => {
	const { inventory } = props;

	// grabs the current path
	const param = props.match.params.category;

	// will contain the subcategories, if there are any
	const subCategories = [];

	const subImgs = [];

	// grabs the sub categories. Even though this "isn't being used", its needed for getInvItems
	const getSubCategories =
		inventory && inventory[param]
			? inventory[param].map(a => {
					if (!subCategories.includes(a.subcategory)) {
						subImgs.push(a.url);
						subCategories.push(a.subcategory);
					}
			  })
			: null;

	// checks if there are no sub categories. if not, gets the inventory items.
	const getInvItems = subCategories.includes('')
		? inventory[param].map(a => a)
		: null;

	// contains individual inventory items if there are no sub categories
	const itemsToRender = subCategories.length ? subCategories : null;
	return (
		<Fragment>
			<Row>
				{itemsToRender &&
					!getInvItems &&
					itemsToRender.map((a, i) => (
						<Col md="6" xl="4" key={a}>
							<Card className="card card-cascade wider reverse mt-4 mb-2 animated fadeInUpBig img-width">
								<Link to={`${props.match.url}/${a}`}>
									<div className="view view-cascade overlay">
										<View zoom>
											<CardImage
												cascade
												src={subImgs[i]}
												className="card-image"
												alt="Category Image"
											/>
											<div className="mask flex-center waves-effect waves-light cat-names text-justify" />
										</View>
									</div>
								</Link>
							</Card>
							<Link to={`${props.match.url}/${a}`}>
								<figcaption className="figure-caption text-center animated fadeInUpBig fig-size">
									{a}
								</figcaption>
							</Link>
						</Col>
					))}
			</Row>
			{getInvItems &&
				getInvItems.map((a, i) => {
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
				})}
		</Fragment>
	);
};

export default SubCategoryComponentWrapper;
