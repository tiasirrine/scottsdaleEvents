import React from 'react';
import { Link } from 'react-router-dom';

const CategoryComponentWrapper = props => {
  const { categories, image } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        {categories
          ? categories.map(a => (
              <div key={a}>
                <Link to={`/inventory/${a}`}>
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

export default CategoryComponentWrapper;
