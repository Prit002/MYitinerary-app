import React, { Component } from 'react';
import Hamburger from './Hamburger';
// import Accordion from './Accordion';
import GaudiSlider from './GaudiSlider';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

let cityURL = window.location.pathname.split("/")[2];

class MYtinerary extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      itineraries : this.props.itineraries,
    };
  }

  componentDidMount () {
    this.props.fetchitineraries(cityURL);
  }
  isObjectEmpty = (obj) => {
    if(Object.keys(obj).length === 0){
      return true
    } else{
      return false
    }
  }

    render() {
      if(this.isObjectEmpty(this.props.itineraries) === false){
      const itineraries = this.props.itineraries.itineraries;
      const cityItinerarise = this.props.itineraries.cities
      {console.log(this.props.itineraries)}
        return (
          <div>
            <Hamburger/>
            <div className = "space">{cityItinerarise.map(dynamicCity =>
            <div className="cityAlign">
              <div className = "cityname1">{dynamicCity.name}</div>
              <div className="cityimages"><img src= {dynamicCity.image} alt="destination"/></div>
            </div>
            )}
            </div>
          
            {console.log(this.props.itineraries.itineraries)}
            <div className="collectionSpace">{itineraries.map(itinerary =>
            <div className = "itinerary">
            <div className="collection">
            <div className = "collection1">
             <div className = "item1"><img src={itinerary.profilePic} alt="profileImage"/></div>
             <div className = "item2">{itinerary.profileName}</div></div>
             <div className = "collection2">
             <div className = "item">{itinerary.title}</div>
             <div className = "item">{itinerary.city}</div>
             <div className = "coloum1">
             <div className = "item3">{itinerary.duration}</div>
             <div className = "item4">{itinerary.likes}</div>
             <div className = "item5">{itinerary.price}</div></div>
             <div className = "item8">{itinerary.hashtag}</div>  </div>  
            </div>
            <details><summary className = "slider">view all</summary><GaudiSlider images={itinerary.image}/></details>
            {/* <div> < Accordion/> </div> */}
            </div>
            )}</div>
          </div>
        );
      } else {
        return(
          <div className = "loader">
            </div>
        )
      }
    }
  }
    const mapStateToProps = (state) =>{
      return {
        itineraries : state.itineraries,
    
      }
      }
      const mapDispatchToProps = (dispatch) =>{
      return {
        fetchitineraries:(city) => dispatch(actionCreator.fetchitineraries(city))
      }
      }
    
    export default connect(mapStateToProps, mapDispatchToProps) (MYtinerary);