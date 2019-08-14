import React, { Component } from 'react'
import './App.css';
import PlaceList from './PlaceList';
import Hamburger from './Hamburger';
import MainBody from './MainBody';
// import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hamburger />
        <MainBody />
        <PlaceList />
        {/* <Footer /> */}

      </div>
    );
  }
}

export default App;
