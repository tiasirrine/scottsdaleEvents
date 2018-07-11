import React, { Component, Fragment } from "react";
import images from "./Images";
import "./Gallery.css";

class Gallery extends Component {
  render() {
    console.log(images);
    return (
      <Fragment className="gallery-container">
        {images.map((image, index) => {
          return <img className="gallery-image" src={image} key={index} />;
        })}
      </Fragment>
    );
  }
}

export default Gallery;
