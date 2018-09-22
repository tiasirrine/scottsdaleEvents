import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import images from './Images';

const photos = [
  { src: images[0], width: 4, height: 3 },
  { src: images[1], width: 1, height: 1 },
  { src: images[2], width: 3, height: 4 },
  { src: images[3], width: 3, height: 4 },
  { src: images[4], width: 3, height: 4 },
  { src: images[5], width: 4, height: 3 },
  { src: images[6], width: 3, height: 4 },
  { src: images[7], width: 4, height: 3 },
  { src: images[8], width: 4, height: 3 }
];

class photoGallery extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  render() {
    return (
      <div className="margintop-100">
        <Gallery photos={photos} onClick={this.openLightbox} />
        <Lightbox
          images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    );
  }
}

export default photoGallery;
