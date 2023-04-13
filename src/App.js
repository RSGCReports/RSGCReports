import React from 'react';
import { useState } from 'react';
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
import { Chatbot } from 'react-chatbot-kit';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';
import config from './bot/config';
import 'react-chatbot-kit/build/main.css';
import roboto from './assets/robot-svgrepo-com.svg';

function App({ user }) {
  const [showChat, toggleBot] = useState(false);
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
        <footer>
          <div>
            {showChat && (
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            )}
          </div>
          <div>
            <button style={{ float: 'right' }} onClick={() => toggleBot((prev) => !prev)}>
              <div>Chat Bot</div>
              <img src={roboto} />
            </button>
          </div>
        </footer>
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
