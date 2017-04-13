import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <div className="App-header">
          <h2>Welcome to BookTrade</h2>
        </div>
        <p className="App-intro">
          Login to get started
        </p>
      </div>
    );
  }
}

export default Home;
