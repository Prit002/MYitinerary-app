import React, { Component } from 'react';
import MYitineraryLogo from './images/MYitineraryLogo.png';
import arrow from './images/arrow.png';

class MainBody extends Component {


    render() {
      return (
        <div className="Main">
          <div className="logo">
            <img src={MYitineraryLogo} alt="logo" /></div>
          <p className="text-align">
            Find your perfect trip, designed by insiders, who know and love their cities.
            </p>
            <p className="header">Start browsing</p>
          <div className="direction-arrow"> <a href="/Cities">
            <img src={arrow} className="arrow" alt="direction" /></a></div>
          
        </div>
  
      );
    }
  }
  
  export default MainBody;