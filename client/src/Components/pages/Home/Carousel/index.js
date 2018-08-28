import React, { Component } from 'react';
import images from './Images';
import { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';

class CarouselPage extends Component {
  render() {
    return (
      <Container>
        <br />
        <Carousel activeItem={1} length={4} showControls={true} showIndicators={false} className="z-depth-1">
          <CarouselInner>
            <CarouselItem itemId="1">
              <View>
                <img className="d-block w-100" src={images[0]} alt="First slide" />
              </View>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View>
                <img className="d-block w-100" src={images[1]} alt="Second slide" />
              </View>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View>
                <img className="d-block w-100" src={images[2]} alt="Third slide" />
              </View>
            </CarouselItem>
            <CarouselItem itemId="4">
              <View>
                <img className="d-block w-100" src={images[3]} alt="Mattonit's item" />
              </View>
            </CarouselItem>
          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselPage;
