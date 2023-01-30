import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/routes/About';
import NotFound from './components/routes/NotFound';
import NavigationBar from './components/NavigationBar';
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
        <NavigationBar signOut={signOut} />
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* <button onClick={signOut}>Logout</button> */}
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
