import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function NavHeader(props) {
  const isLoggedIn = props.auth.loggedIn();

  let loginOrMenu;

  if (isLoggedIn) {
    loginOrMenu = (
      <div>
        <Nav pullRight onSelect={props.handleSelect}>
          <NavItem eventKey={2}>Log Out</NavItem>
        </Nav>
        <Navbar.Text pullRight>Welcome {props.profile.name}</Navbar.Text>
        <Nav pullRight onSelect={props.handleSelect}>
          <NavItem eventKey={3}>All Books</NavItem>
          <NavItem eventKey={4}>My Books</NavItem>
        </Nav>
     </div>);
  } else {
    loginOrMenu = (
      <Nav className="navbar-right" onSelect={props.handleSelect}>
        <NavItem eventKey={1} data-test="Login" href="#">Login</NavItem>
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
    </Navbar>);
}

export default NavHeader;
