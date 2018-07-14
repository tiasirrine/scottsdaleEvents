import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import SubMedia from './SubMedia';
import { Container, Row, Col } from 'reactstrap';

class CategoryProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.match.params.category,
      subcategory: null
    };
  }

  // loads the inventory items based on the category.
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        console.log('result:', result);
        const newArray = [];
        result.data.forEach(element => {
          if (!newArray.includes(element.subcategory)) {
            newArray.push(element.subcategory);
          }
        });
        return this.setState({ subcategories: newArray });
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
    console.log(this.state);
    const { subcategory, error } = this.state;
    let indInventoryCards = subcategory
      ? subcategory.map((a, index) => {
          return (
            <Col sm="2.4" key={index}>
              <SubMedia cardTitle={a} id={index} />
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
