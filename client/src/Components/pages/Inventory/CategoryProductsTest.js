import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import InventoryCard from './InventoryCard';
import {
  Card,
  CardDeck,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
  Row,
  Col
} from 'reactstrap';

class CategoryProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.match.params.category,
      categoryItems: null
    };
  }

  // loads the inventory items based on the category.
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const arr = result.data.map(index => index['NAME']);
        return this.setState({ categoryItems: arr });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: '500 (Internal Server Error)' });
      });
  };

  componentWillMount() {
    this.setState({
      route: this.props.match.params.category,
      categoryItems: this.loadCategoryProducts(this.props.match.params.category)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.setState({
        route: this.props.match.params.category,
        categoryItems: this.loadCategoryProducts(this.props.match.params.category)
      });
    }
  }

  render() {
    const { categoryItems, error } = this.state;
    let indInventoryCards = categoryItems
      ? categoryItems.map(a => {
          return (
            <Col sm="4">
              <InventoryCard cardTitle={a} key={a} />
              {error ? <h3 className="text-center">{error}</h3> : null}
            </Col>
          );
        })
      : null;

    return (
      <Fragment>
        <Container fluid>
          <div className="inventory-type">{this.props.match.params.category}</div>
          <Row>{indInventoryCards}</Row>
        </Container>
      </Fragment>
    );
  }
}

export default CategoryProduct;
