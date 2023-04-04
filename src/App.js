import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/routes/About';
import NotFound from './components/routes/NotFound';
import NavigationBar from './components/NavigationBar';
import Profile from './components/routes/Profile';
import Reports from './components/routes/Reports';
import NewReport from './components/routes/NewReport';
import ViewReport from './components/routes/ViewReport';
import ViewAllReport from './components/routes/ViewAllReport';
import AccountPage from './components/routes/AccountPage';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

function App({ user }) {
  // function authorizationHeaders(type = 'application/json') {
  //   const headers = { 'Content-Type': type };
  //   headers['Authorization'] = `Bearer ${user.signInUserSession.idToken.jwtToken}`;
  //   return headers;
  // }

  // console.log(authorizationHeaders());
  localStorage.setItem(
    'token',
    JSON.stringify(`Bearer ${user.signInUserSession.idToken.jwtToken}`)
  );

  return (
    <div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/reports" element={<Reports />} />
          <Route exact path="/viewreport/:Id" element={<ViewReport />} />
          <Route exact path="/viewallreport" element={<ViewAllReport />} />
          <Route exact path="/newreport" element={<NewReport />} />
          <Route exact path="/accountpage" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

App.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string,
};

export default withAuthenticator(App, {
  signUpAttributes: ['email', 'name'],
});
