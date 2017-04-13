import './NavHeader.css';
import React, { Component, PropTypes as T } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import AuthService from './utils/AuthService';

// TODO: Temporary hack because react-bootstrap has not caught up to
// react-router 4.0.
function RouterLink ({ to, children }) {
  // use activeStyle from bootstrap.css of your theme
  // search for:  .navbar-default .navbar-nav > .active > a,
  return (
    <li>
      <NavLink to={to} activeStyle={{ color: '#d9230f' }}>{children}</NavLink>
    </li>
  );
}

class NavHeader extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor (props) {
    super(props);
    const self = this;

    this.state = {
      profile: props.auth.getProfile(),
      loggedIn: props.auth.loggedIn()
    }

    props.auth.on('profile_updated', (newProfile) => {
      self.setState({ profile: newProfile });
    });

    props.auth.on('authenticated', () => {
      self.setState({ loggedIn: self.props.auth.loggedIn() });
    });

    props.auth.on('logout', () => {
      self.setState({ loggedIn: self.props.auth.loggedIn() });
    });


  }

//            <LinkContainer to="/allbooks">
//              <NavItem eventKey={3}>All Books</NavItem>
//            </LinkContainer>
//            <NavItem eventKey={2}>Log Out!</NavItem>
//        <NavItem eventKey={1} data-test="Login" href="#">Login</NavItem>

  render() {

    let loginOrMenu;

    if (this.props.auth.loggedIn()) {
      loginOrMenu = (
        <div>
          <Nav pullRight >
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/mytrades">Requests by Me</RouterLink>
            <RouterLink to="/tradesforme">Requests for Me</RouterLink>
            <RouterLink to="/allbooks">All Books</RouterLink>
            <RouterLink to="/mybooks">
              {'My Books '}
              <span className="myBook-icon glyphicon glyphicon-user" aria-hidden="true" />
            </RouterLink>
            <RouterLink to="/profile">{this.props.auth.getProfile().name} <span className="settings-icon glyphicon glyphicon-cog" aria-hidden="true"></span></RouterLink>
            <RouterLink to="/logout">Logout</RouterLink>
          </Nav>
      </div>);
    // Not logged in
    } else {
      loginOrMenu = (
        <Nav className="navbar-right" >
          <RouterLink to="/login">Login</RouterLink>
        </Nav>);
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Book Trading Club</a>
          </Navbar.Brand>
        </Navbar.Header>
        {loginOrMenu}
      </Navbar>
    );
  }
}

export default NavHeader;
