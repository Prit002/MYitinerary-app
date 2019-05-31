import React, { Component } from "react";
import Hamburger from "./Hamburger";
import homeIcon from './images/homeIcon.png';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

const initialState = {
      username: "",
      password: "",
      // isLoading: true,
      rememberMe:false,
      usernameError:"",
      passwordError:"",
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

validate=() =>{
  let usernameError = "";
  let passwordError ="";

  if(!this.state.username) {
    usernameError = "User cannot be Blank";
  }
   if(!this.state.password) {
    passwordError = "password cannot be Blank";
  }
if(usernameError || passwordError) {
  this.setState({
    usernameError, passwordError});
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
      this.props.logInUser(this.state)

    }
    
  };
    render() {
        return (
          <div>
            <Hamburger/>
            <h3 className="accountheading"> Login</h3>
            <form className = "loginheight"  onSubmit={this.handleSubmit}>
          <div className="formbox">
            {" "}
            <label className="content">Username :</label>
            <input
              className="inputbox"
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="formbox">
            <label className="content">Password : </label>
            <input
              className="inputbox"
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className= "formbox2">
          <input
              className="inputbox2"
              type="checkbox"
              name="rememberMe"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
            />
            <span>Remember Me</span>
          </div>
       <div className = "direction"> <button className="signup ">OK</button></div>  
        </form>
        <div className = "direction"><a href ="/Account">Create Account</a></div>
        <div  className = "direction">
              <a href="/"><img src={homeIcon} className="login" alt="appPage" /></a>
          </div>
          </div>
        );
      }
    }
    const mapStateToProps = (state) =>{
return {
 userLoggedIn:state.userLoggedIn,
}
}
const mapDispatchToProps = (dispatch) =>{
return {
  logInUser:(user) => dispatch(actionCreator.logInUser(user))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)