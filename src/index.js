import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import process from 'process';

// Configure our Auth object to use our Cognito User Pool
Amplify.configure({
  Auth: {
    region: 'us-east-1',

    userPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID,

    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,

    oauth: {
      domain: process.env.AWS_COGNITO_HOSTED_UI_DOMAIN,

      scope: ['email', 'profile', 'openid'],

      redirectSignIn: process.env.REACT_APP_OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: process.env.REACT_APP_OAUTH_SIGN_OUT_REDIRECT_URL,

      responseType: 'code',
    },
  },
});

/* React Bootstrap */
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
