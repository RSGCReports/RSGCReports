import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './component/About';
import Account from './component/Account';
import Reports from './component/Reports';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

function App({ signOut, user }) {
  function authorizationHeaders(type = 'application/json') {
    const headers = { 'Content-Type': type };
    headers['Authorization'] = `Bearer ${user.signInUserSession.idToken.jwtToken}`;
    return headers;
  }

  console.log(authorizationHeaders());

  return (
    <div>
      <Router>
        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/Account">Account</Link>
            </li>
            <li>
              <Link to="/Reports">Reports</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<About />}></Route>
            <Route exact path="/Account" element={<Account />}></Route>
            <Route exact path="/Reports" element={<Reports />}></Route>
          </Routes>
        </div>
      </Router>
      <button onClick={signOut}>Logout</button>
      <h1>Hello {user.username}</h1>
    </div>
  );
}

App.propTypes = {
  signOut: PropTypes.func,
  user: PropTypes.object,
  username: PropTypes.string,
};

export default withAuthenticator(App, {
  signUpAttributes: ['email', 'name'],
});
