import React, { Component } from 'react'
import GaudiSlider from './GaudiSlider';

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = { condition: false };
        this.toggleCondition = this.toggleCondition.bind(this);
    }
    toggleCondition() {
        const newCondition = this.state.condition == false ? true : false;
        this.setState({ condition: newCondition });
    }

    render() {
        return (

                <nav className="dropdown">
                      <div>
                        <button className="dropdown-button" onClick={this.toggleCondition}>View all
                            {this.state.condition && <div class="dropdownslider" >
                        
                            </div>}
                        </button>
                    </div>
                </nav>

        )
    }
}

export default Accordion;