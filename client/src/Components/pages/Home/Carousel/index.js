import React, { Component } from 'react';
//import images from './Images';
import { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';

class CarouselPage extends Component {
  render() {
    return (
      <Container>
        <h4 className="mt-5 mb-2">Basic example</h4>
        <Carousel
          activeItem={1}
          length={4}
          showControls={true}
          showIndicators={false}
          className="z-depth-1"
        >
          <CarouselInner>
            <CarouselItem itemId="1">
              <View>
                <img
                  className="d-block w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                  alt="First slide"
                />
              </View>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View>
                <img
                  className="d-block w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(99).jpg"
                  alt="Second slide"
                />
              </View>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View>
                <img
                  className="d-block w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
                  alt="Third slide"
                />
              </View>
            </CarouselItem>
            <CarouselItem itemId="4">
              <View>
                <img
                  className="d-block w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20%28143%29.jpg"
                  alt="Mattonit's item"
                />
              </View>
            </CarouselItem>
          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselPage;
