import React, { Component } from 'react';
import Places from './Places.json';
import { Slide } from 'react-slideshow-image';

class PlaceList extends Component {
  render() {
    const settings = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true
    };
    return (
      
      <div className="places1">
      <Slide {...settings}>
        {Places.map((placeDetail, index)=>{
            return (
              <div className="detail" >
                <h4 className="heading">{placeDetail.name}</h4>
                <div className="images"><img src= {placeDetail.image} alt="destination"/></div>
              </div>

              );
          }
        )}
        </Slide>
      </div>
    );
  }
}

export default PlaceList;