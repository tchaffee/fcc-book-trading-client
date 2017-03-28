import { Component } from 'react';

// import AuthService from './utils/AuthService';

class Logout extends Component {

  componentWillMount () {
    if (this.props.auth.loggedIn()) {
      this.props.auth.logout();
    }
    this.props.history.replace(this.props.redirectPath);    
  }

  render() {
    return null;
  }
}

export default Logout;
