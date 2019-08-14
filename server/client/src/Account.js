import React, { Component } from "react";
import Hamburger from "./Hamburger";
import homeIcon from './images/homeIcon.png';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

const selectcountries = [
  "England",
  "France",
  "Germany",
  "Netherlands",
  "Ireland",
  "Spain",
  "United States",
  "India"
];

const initialState = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      countries: "",
      rememberMe:false,
      usernameError:"",
      passwordError:"",
      emailError:"",
      firstnameError:"",
      lastnameError:"",
      countryError:"",
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    //  this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event=> {
    const isCheckbox = event.target.type ==="checkbox";
    this.setState({
      [event.target.name] : isCheckbox
      ? event.target.checked
      : event.target.value
    });
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    // this.setState({
    //   [name]: value
    // });
  };

  validate=() =>{
  let usernameError = "";
  let passwordError ="";
  let emailError ="";
  let firstnameError ="";
  let lastnameError ="";
  let countryError = "";

  if(!this.state.username) {
    usernameError = "User cannot be Blank";
  }
   if(!this.state.password) {
    passwordError = "password cannot be Blank";
  }
  if(!this.state.email) {
    emailError = "email cannot be Blank";
  }
  if(!this.state.firstname) {
    firstnameError = "firstname cannot be Blank";
  }
  if(!this.state.lastname) {
    lastnameError = "lastname cannot be Blank";
  }
  if(!this.state.countries) {
    countryError = " select your country";
  }
  if(usernameError || passwordError || emailError || firstnameError || lastnameError || countryError) {
   this.setState({
    usernameError, passwordError, emailError, firstnameError, lastnameError, countryError});
     return false;
}
     return true;
};


    // this.setState({ [event.target.name]: event.target.value });
  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid){
      console.log(this.state);
      this.setState(initialState);
      // this.props.history.push("/");
      this.props.signUpUsers(this.state)

    }
  };
  render() {
      
    const option = selectcountries.map((option,i) =>{
      return(
      <option key={option} value={option}>
        {option}
      </option>
    )})

    return (
      <div>
        <Hamburger />
        <h3 className="accountheading"> Create Account</h3>
        <div className = "circle-container">
        <div id="circle">
          <span className="innerTEXT"> Add your Photo</span>
        </div>
        </div>
        <form className = "formheight" onSubmit={this.handleSubmit}>
          <div className="formdetail">
          <div className="formbox">
            <label className="content">Username :</label>

            <input
              className="inputbox"
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            /></div>
      
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.usernameError}
            </div>
            </div>
          <div className="formdetail">
          <div className="formbox">
            <label className="content">Password : </label>
            <input
              className="inputbox"
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            /></div>
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
            </div>
            </div>
          <div className="formdetail">
          <div className="formbox">
            <label className="content">Email :</label>
            <input
              className="inputbox1"
              type="text"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            /></div>
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
            </div>
          </div>
          <div className="formdetail">
          <div className="formbox">
            <label className="content">First Name : </label>
            <input
              className="inputbox2"
              type="text"
              placeholder= "firstname"
              name="firstname"
              value={this.state.firstname}
              onChange={ this.handleChange}
            /></div>
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.firstnameError}
            </div>
            </div>
          <div className="formdetail">
          <div className="formbox">
            <label className="content">Last Name : </label>
            <input
              className="inputbox2"
              type="text"
              placeholder="lastname"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            /></div>
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.lastnameError}
            </div>
          </div>
          <div className="formdetail">
          <div className = "formbox1">
            <label className="content">Select your Country :  </label>
            <select
              className=""
              name="countries"
              onChange={this.handleChange}
              value={this.state.countries}
            >
              <option value="">Choose</option>
              {option}
            </select></div>
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.countryError}
            </div>
          </div>
          <div className= "formbox2">
          <input
              className="inputbox3"
              type="checkbox"
              name="rememberMe"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
            />
            
            <span className="agree">I agree to MYtinerary's <a href ="Terms & Conditions">Terms & Conditions</a></span>
          </div>
       <div className = "direction"> <button className="signup">Sign up</button></div>  
        </form>
        <div className = "direction1">
              <a href="/"><img src={homeIcon} className="login" alt="appPage" /></a>
          </div>
      </div>
    );
  }
}
 const mapStateToProps = (state) =>{
return {
 userAdded:state.userAdded,
}
}
const mapDispatchToProps = (dispatch) =>{
return {
  signUpUsers:(userInfo) => {dispatch(actionCreator.signUpUsers(userInfo))}
  
}
}
export default connect(mapStateToProps, mapDispatchToProps) (Account);