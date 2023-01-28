import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

// Configure our Auth object to use our Cognito User Pool
Amplify.configure({
  Auth: {
    // Amazon Region
    region: 'us-east-1',
    // Amazon Cognito User Pool ID
    userPoolId: process.env.AWS_COGNITO_POOL_ID,
    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.AWS_COGNITO_CLIENT_ID,
    // Hosted UI configuration
    oauth: {
      // Amazon Hosted UI Domain
      domain: process.env.AWS_COGNITO_HOSTED_UI_DOMAIN,
      // These scopes must match what you set in the User Pool for this App Client
      scope: ['email', 'profile', 'openid'],
      // NOTE: these must match what you have specified in the Hosted UI
      // app settings for Callback and Redirect URLs (e.g., no trailing slash).
      redirectSignIn: process.env.OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: process.env.OAUTH_SIGN_OUT_REDIRECT_URL,
      // We're using the Access Code Grant flow (i.e., `code`)
      responseType: 'code',
    },
  },
});

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
