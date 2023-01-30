import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import '../styles/NavBar.css';

const NavigationBar = () => {
  const [username, setUserName] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setUserName(users.username));
  });

  const signOut = (e) => {
    e.preventDefault();
    Auth.signOut();
  };

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  return (
    <Navbar expand="lg" bg="dark" varient="dark">
      <Navbar.Brand href="/">RSGC</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            About
          </Nav.Link>
          <Nav.Link as={Link}>Contact Us</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={username} id="collapsible-nav-dropdown">
            <NavDropdown.Item href="">Profile</NavDropdown.Item>
            <NavDropdown.Item href="">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="" className="dropdown-logout">
              <Button variant="dark" onClick={(e) => signOut(e)}>
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
