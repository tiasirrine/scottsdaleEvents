import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SideNavButton from './SideNavButton';

const styles = {
  btnContainer: {
    padding: '20px'
  },
  mainDiv: {
    marginTop: 30
  },
  link: {
    color: 'white'
  }
};

const SideNavContent = ({ catAndSubCat }) => {
  const categoryButton = catAndSubCat ? Object.keys(catAndSubCat) : null;
  console.log(categoryButton);
  return (
    <div>
      <div>
        {categoryButton &&
          categoryButton.map((button, i) => {
            return (
              <SideNavButton
                key={i}
                buttonName={button}
                childButtons={catAndSubCat}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SideNavContent;
