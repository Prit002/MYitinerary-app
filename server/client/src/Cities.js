import React, { Component } from 'react';
import Hamburger from './Hamburger';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

class Cities extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      cities: this.props.cities,
      search:"",
    };
  }

  renderRedirect = (city) => {
    var cityName = city.charAt(0).toLowerCase() + city.slice(1);

   window.location.href = "/Mytinerary/" + cityName;
  }


  componentDidMount () {
    this.props.fetchCities();
    
  }
  onchange = e =>{
    this.setState({ search : e.target.value});
  }


  render() {
    const {search} = this.state;
    const filtercities = this.props.cities.filter( dynamicCity=>{
      return dynamicCity.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
{console.log(this.props.cities)}
    if(this.props.cityIsLoaded == true){
        return (
          <div>
            <Hamburger />
          <div className ="citytext">Filter our current Cities:<input label= "search city" name="select city"  onChange = {this.onchange}/></div>
            {
              filtercities.sort((a,b) => a.name.localeCompare(b.name)).map((dynamicCity,key) =>
              <div className="cityAlign">
              <div ><button className = "cityname" onClick={ () => {this.renderRedirect(dynamicCity.name)}}>{dynamicCity.name}</button></div>
              <div className="cityimages"><img src= {dynamicCity.image} alt="destination"/></div>
              </div>
              )
            }
            {console.log(this.props.cityIsLoaded)}
      </div>
        )
          }else {
            return (<div className = "loader">
            </div>)
          }
    }
  }
const mapStateToProps = (state) =>{
return {
  cities : state.cities,
  cityIsLoaded: state.cityIsLoaded
}
}
const mapDispatchToProps = (dispatch) =>{
return {
  fetchCities:() => dispatch(actionCreator.fetchCities())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)