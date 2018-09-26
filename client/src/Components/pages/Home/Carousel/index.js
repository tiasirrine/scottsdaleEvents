import React from 'react';
import images from './Images';
import { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';

const CarouselPage = () => (
  <Container>
    <br />
    <Carousel
      activeItem={1}
      length={images.length}
      showControls={true}
      showIndicators={false}
      className="z-depth-1"
    >
      <CarouselInner>
        {images.length &&
          images.map((image, index) => (
            <CarouselItem key={index} itemId={index + 1}>
              <View>
                <img
                  style={{ maxHeight: '628px' }}
                  className="d-block w-100"
                  src={image}
                  alt="First slide"
                />
              </View>
            </CarouselItem>
          ))}
      </CarouselInner>
    </Carousel>
  </Container>
);

export default CarouselPage;
