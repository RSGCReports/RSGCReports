import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './component/About';
import Login from './component/Login';
import Signup from './component/Signup';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

function App({ signOut, user }) {
  // const user = await getUser();

  return (
    <div>
      <Router>
        <div className="App">
          <ul className="App-header">
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
      {/* <button onClick={login}>Login</button> */}
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
// export default App;
// export default withAuthenticator(App);
