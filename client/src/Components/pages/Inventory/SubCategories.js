import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
// import SubMedia from './SubMedia';
import { Container, Row, Col } from 'reactstrap';
import image from '../../../images/Photos/Bars/bar10.jpg';

class SubCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.match.params.category,
      subcategories: null,
      categories: null
    };
  }

  // loads the inventory items based on the category
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        console.log('RESULT DATA:', result.data);
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
      route: this.props.match.params.category,
      categoryItems: this.loadCategoryProducts(this.props.match.params.category)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.setState({
        route: this.props.match.params.category,
        categoryItems: this.loadCategoryProducts(
          this.props.match.params.category
        )
      });
    }
  }

  render() {
    console.log('STATE:', this.state);
    const { subcategories, error } = this.state;
    // let indInventoryCards = subcategories
    //   ? subcategories.map((a, index) => {
    //       return (
    //         <Col sm="3" key={index}>
    //           <SubMedia cardTitle={a} id={index} />
    //           {error ? <h3 className="text-center">{error}</h3> : null}
    //         </Col>
    //       );
    //     })
    //   : null;

    return (
      <Fragment>
        <Container fluid>
          <div className="inventory-type">
            {this.props.match.params.category}
          </div>
          <Row>
            {subcategories
              ? subcategories.map(a => {
                  return (
                    <Col>
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

export default SubCategories;
