import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import '../styles/NavBar.css';
import logo from '../assets/RSGCfavicon.png';

const NavigationBar = () => {
  const [username, setUserName] = useState([]);
  const [exists, toggleExists] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetchUser().then((users) => setUserName(users.username));
    checkUserExists();
  });

  const checkUserExists = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/userInfo`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.userInfo.user) {
          toggleExists(true);
        } else {
          toggleExists(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toggleExists(false);
      });
  };

  const signOut = (e) => {
    e.preventDefault();
    Auth.signOut();
  };

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  return (
    <Navbar expand="lg" bg="dark" varient="dark">
      <Navbar.Brand href="/">
        <img src={logo} alt="RSGCLogo" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            About
          </Nav.Link>
        </Nav>
        {exists ? (
          <Nav>
            <NavDropdown
              title={username}
              id="dropdown-menu-align-end collapsible-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/accountpage">
                Account
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reports">
                Reports
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.ItemText className="dropdown-logout">
                <Button variant="dark" onClick={(e) => signOut(e)}>
                  Logout
                </Button>
              </NavDropdown.ItemText>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <NavDropdown
              title={username}
              id="dropdown-menu-align-end collapsible-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.ItemText className="dropdown-logout">
                <Button variant="dark" onClick={(e) => signOut(e)}>
                  Logout
                </Button>
              </NavDropdown.ItemText>
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
