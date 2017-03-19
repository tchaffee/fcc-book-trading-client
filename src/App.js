import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavHeader from './NavHeader';
import Books from './Books';
import * as booksModel from './models/booksModel';

import AuthService from './utils/AuthService';
const auth = new AuthService('dBLJpCZvLmQEoD0uoXmRMTby8F2b7ju1', 'tchaffee.auth0.com');

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: auth.getProfile(),
      loggedIn: auth.loggedIn(),
      booksData: [ 'a book' ]
    };

    auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
    });

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect (selectedKey) {
    console.log('handleSelect: ' + selectedKey);
    // Login
    if (selectedKey === 1) {
      if ( ! auth.loggedIn()) {
        auth.login();
      }
    // Logout
    } else if (selectedKey === 2) {
      auth.logout();
    } else if (selectedKey === 3) {
      console.log('all books view');
      booksModel.getAllBooks()
      .then(data => {
        console.log('data');
        console.log(data);
        this.setState({
          booksData: data.books
        });
      });
    }

    this.setState( { loggedIn: auth.loggedIn() });
  }

  render() {
    return (
      <div className="App">
        <NavHeader auth={auth} profile={this.state.profile} handleSelect={this.handleSelect}/>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Books data={this.state.booksData} />
      </div>
    );
  }
}

export default App;
