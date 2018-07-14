import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import InventoryCard from './InventoryCard';
import { Container, Row, Col } from 'reactstrap';

class SubCategoryProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.match.params.subcategory,
      categoryItems: null,
      descriptionItems: null
    };
  }

  // loads the inventory items based on the category.
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        console.log('result:', result);
        // const arr = result.data.map(index => index['name']);
        // const arr2 = result.data.map(index => index['description']);
        return this.setState({ categoryItems: result.data });
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
    console.log('result:', this.state);
    const { categoryItems, error } = this.state;
    let indInventoryCards = categoryItems
      ? categoryItems.map((a, index) => {
          return (
            <Col sm="2.4" key={index}>
              <InventoryCard cardTitle={a.name} cardDesc={a.description} id={index} />
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

export default SubCategoryProduct;
