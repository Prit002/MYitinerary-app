import React, { Component } from "react";
import Hamburger from "./Hamburger";
import homeIcon from './images/homeIcon.png';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

const initialState = {
      email: "",
      password: "",
      // isLoading: true,
      rememberMe:false,
      emailError:"",
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
  let emailError = "";
  let passwordError ="";

  if(!this.state.email) {
    emailError = "email cannot be Blank";
  }
   if(!this.state.password) {
    passwordError = "password cannot be Blank";
  }
if(emailError || passwordError) {
  this.setState({
    emailError, passwordError});
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

  handleLogout (event) {
    event.preventDefault();
    
      this.props.logOutUser(this.state)
      this.props.history.push("/login");
  }
// }
    render() {

      const showLoginPage = (

        <div>
            <Hamburger/>
            <h3 className="accountheading"> Login</h3>
            <form className = "loginheight"  onSubmit={this.handleSubmit}>
            <div className="formdetail">
          <div className="formbox">
            {" "}
            <label className="content">Email :</label>
            <input
              className="inputbox1"
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
            </div>
          </div>
          <div className="formdetail">
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
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
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
            <span>Remember Me</span>
          </div>
       <div className = "direction"> <button className="signup ">OK</button></div>  
        </form>
        <div className = "direction"><a href ="/Account">Create Account</a></div>
        <div  className = "direction">
              <a href="/"><img src={homeIcon} className="login" alt="appPage" /></a>
          </div>
          </div>
      )

      const afterLoginMessage =(
        <div>
          <Hamburger/>
          <p>You are currently Logged In</p>
          <p>Click on the home icon to go on Home page.</p>
          <a href="/"><img src={homeIcon} className="login" alt="appPage" /></a>
          <p>Click on the Log out Button If you want to sign Out</p>
          <div className = "direction"> <button className="signup " onClick={this.props.logOutUser}>LogOut</button></div> 
          

        </div>
      )
      const userLoggedIn = this.props.userLoggedIn
        return (
          <div>
            {userLoggedIn ? afterLoginMessage : showLoginPage }
            {/* <div className = "direction1">
              <a href="/"><img src={homeIcon} className="login" alt="appPage" /></a>
          </div> */}
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
  logInUser:(user) => {dispatch(actionCreator.logInUser(user))},
  logOutUser:() =>  {dispatch(actionCreator.logOutUser())}

  
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)