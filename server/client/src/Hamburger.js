import React, { Component } from 'react'
import Loginicon from './Loginicon';


class Hamburger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            condition: false ,
        }
        

        this.toggleCondition = this.toggleCondition.bind(this);
    }
        
    toggleCondition() {
        const newCondition = this.state.condition == false ? true : false;
        this.setState({ condition: newCondition });
    }

    render() {
        return(
                <nav className="navigation">

                    <div>
                        <Loginicon/>
                    </div>

                    <div>

                        <button className="toggle-button" onClick={this.toggleCondition}>
                            <div className="toggle-button-line " />
                            <div className="toggle-button-line " />
                            <div className="toggle-button-line " />
                            {this.state.condition && <div className="sidebar" >
                                <ul>
                                    <li>
                                        <a href="/">App</a>
                                    </li>
                                    <li>
                                        <a href="/Cities">Cities</a>
                                    </li>
                                    <li>
                                        <a href="/Account">Account</a>
                                    </li>
                                    <li>
                                        <a href="/Login">Login</a>
                                    </li>
                                </ul>
                            </div>}
                        </button>
                    </div>
                </nav>

        )
    }
}
export default Hamburger;