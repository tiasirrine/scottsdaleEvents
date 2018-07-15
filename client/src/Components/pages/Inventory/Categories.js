import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
// import SubMedia from './SubMedia';
import { Container, Row, Col } from 'reactstrap';
import image from '../../../images/Photos/Bars/bar10.jpg';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.route = this.props.match.params.category || null;
    this.state = { route: this.route, subcategories: null, categories: null };
  }

  // loads the inventory items based on the category
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const subcategories = [];
        const products = result.data;
        result.data.forEach(element => {
          if (!subcategories.includes(element.subcategory)) {
            subcategories.push(element.subcategory);
          }
        });
        return this.setState({ subcategories, products });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: '500 (Internal Server Error)' });
      });
  };

  componentWillMount() {
    this.setState({
      route: this.route,
      categoryItems: this.loadCategoryProducts(this.route)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.route !== prevProps.match.params.category) {
      this.setState({
        route: this.route,
        categoryItems: this.loadCategoryProducts(this.route)
      });
    }
  }

  render() {
    const { subcategories, error } = this.state;

    return (
      <Fragment>
        <Container fluid>
          <div className="inventory-type">{this.route}</div>
          <Row>
            {subcategories
              ? subcategories.map(a => {
                  return (
                    <Col key={a}>
                      <Link to="">
                        <img className="image" src={image} />
                        <p>{a}</p>
                      </Link>
                    </Col>
                  );
                })
              : null}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Categories;
