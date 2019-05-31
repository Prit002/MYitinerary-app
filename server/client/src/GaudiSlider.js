import React, { Component } from "react";
// import GaudiSlide from './GaudiSlide.json';
// import {Slide} from 'react-slideshow-image';

class GaudiSlider extends Component {
  render() {
    
    console.log(this.props.images);
    const imageObject = this.props.images;


    if (imageObject != undefined) {
      return (
        <div className="places">
            {Object.keys(imageObject).map(key => (
            <span> {key} <img src={imageObject[key]} alt="destination"/></span>
            ))}
          </div>
      );
    } else {
      return <div>no images</div>;
    }
  }
}

export default GaudiSlider;

//  imageObject.map((itinerary, index) => {
//   return (
//   <div className = "detail" >
//     {/* <h4 className = "heading"> { itinerary} </h4>  */}
//    < div className = "images1"> < img src = {itinerary} alt = "destination" /> </div>
//     </div>

//   );
// })
