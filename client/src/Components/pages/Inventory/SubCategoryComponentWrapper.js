import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, Col, Container, Row, View } from 'mdbreact';
import InventoryCard from './InventoryCard';

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
  const getInvItems = subCategories.includes('') ? inventory[param].map(a => a) : null;

  // contains individual inventory items if there are no sub categories
  const itemsToRender = subCategories.length ? subCategories : null;
  console.log(inventory);
  return (
    <Fragment>
      <Row className="justify-content-md-center">
        {itemsToRender && !getInvItems
          ? itemsToRender.map(a => (
              <Col md="6" lg="4" xl="3" key={a} className="ind-card-col">
                <Card className="card card-cascade wider reverse my-4 animated fadeInUpBig w-300">
                  <Link to={`${props.match.url}/${a}`}>
                    <div className="view view-cascade overlay">
                      <View zoom>
                        <CardImage
                          cascade
                          src={image}
                          className="img-fluid ind-card-image"
                          alt="Category Image"
                        />
                        <div className="mask flex-center waves-effect waves-light cat-names text-justify rgba-white-strong">
                          <strong>{a}</strong>
                        </div>
                      </View>
                    </div>
                  </Link>
                </Card>
              </Col>
            ))
          : null}
      </Row>
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

export default SubCategoryComponentWrapper;
