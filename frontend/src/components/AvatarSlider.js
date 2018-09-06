import React, { Component } from 'react';
import AvatarSlide from './AvatarSlide';
import AvatarLeftArrow from './AvatarLeftArrow';
import AvatarRightArrow from './AvatarRightArrow';

import './styles/avatarSlider.css';

export default class AvatarSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: ['orange', 'carrot', 'grapes', 'sushi'],
      currentIndex: 0,
      translateValue: 0
    }
  }

  goToPrevSlide = () => {
    if(this.state.currentIndex === 0) {
      return this.setState({
        currentIndex: this.state.images.length - 1,
        translateValue: -(document.querySelector('.slide').clientHeight * (this.state.images.length-1))
      })
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue - -(this.slideWidth())
    }));
  }

  goToNextSlide = () => {
    if(this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

    slideWidth = () => {
      return document.querySelector('.slide').clientHeight
    }

  render() {
    console.log(this.state.currentIndex);
    return (
      <div className="avatarSlider">
        <div className="sliderWrapper"
          style={{
            transform: `translateY(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          {
            this.state.images.map((image, i) => (
              <AvatarSlide key={i} image={image} />
            ))
          }
          </div>
          {this.state.currentIndex > 0 && <AvatarLeftArrow goToPrevSlide={this.goToPrevSlide}/>}
          <AvatarRightArrow goToNextSlide={this.goToNextSlide}/>
      </div>
    );
  }
}
