import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

const photos = [
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/0.JPG',
    width: 3,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/1.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/2.JPG',
    width: 2,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/3.JPG',
    width: 3,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/4.JPG',
    width: 2,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/5.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/6.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/7.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/8.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/9.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/10.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/11.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/12.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/13.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/14.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/15.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/16.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/17.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/18.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/19.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/20.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/21.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/22.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/23.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/24.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/25.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/26.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/27.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/28.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/29.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/30.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/31.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/32.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/33.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/34.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/35.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/36.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/37.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/38.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/39.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/40.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/41.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/42.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/43.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/44.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/45.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/46.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/47.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/48.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/49.JPG',
    width: 4,
    height: 3
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/scottsdaleevents/gallery_photos/50.JPG',
    width: 4,
    height: 3
  }
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
