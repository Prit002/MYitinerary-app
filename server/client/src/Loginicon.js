import React, { Component } from 'react'
import adminLogin from './images/admin-login.png';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/action';

class Loginicon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conditionlogIn: false
        }
    
        this.toggleLoginCondition = this.toggleLoginCondition.bind(this);
    }

    componentDidMount () {
        this.props.logOutUser();
        
      }

    toggleLoginCondition(){
        const newLoginCondition = this.state.conditionlogIn == false ? true : false;
        this.setState({ conditionlogIn: newLoginCondition });
    }
    
    render() {
        const logOutUser =(
            <div onClick= {this.props.LogOutUser}>Log Out</div>
        )

        const signInUser = (
            <div >
            <a href="/login" className ="spacing">Login</a>
            <a href="/Account" className ="spacing">Create Account</a>
            </div> 
        )
            const userLoggedIn = this.props.userLoggedIn
       
            return (
                <div>
                <button className="toggle-button" onClick={this.toggleLoginCondition}>
                <div><img src={adminLogin} className="login" alt="login" /></div>
                {this.state.conditionlogIn && <div className ="loginbar">
               {userLoggedIn ? logOutUser : signInUser}
                </div>} 
                </button>
            </div>
            )
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
      logOutUser:() => {dispatch(actionCreator.logOutUser())}
    
      
    }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Loginicon)


 // if (this.props.userLoggedIn === true){
        //     return(
        //             <div>
        //                 <button className="toggle-button" onClick={this.toggleLoginCondition}>
        //                 <div><img src={adminLogin} className="login" alt="login" /></div>
        //                 {this.state.conditionlogIn && <div className ="loginbar">
                       
        //                 </div>}
        //                 </button>
        //             </div>
        //     )
        //     }