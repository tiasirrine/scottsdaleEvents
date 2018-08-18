import React from 'react';
const SideNavButton = ({ buttonName, childButtons }) => {
  return (
    <div>
      <div>
        <p>
          {buttonName} <i className="fa fa-angle-down rotate-icon" />
        </p>
        {childButtons &&
          childButtons[buttonName].map((childButton, i) => {
            return <p key={i}>{childButton}</p>;
          })}
      </div>
    </div>
  );
};

export default SideNavButton;
