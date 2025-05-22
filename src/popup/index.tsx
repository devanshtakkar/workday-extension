import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SignIn from './SignIn';
const App: React.FC = () => {
  let [showSignIn, setShowSignIn] = useState(true);
  // when the popup is opened, check if the FIREBASE_LOGIN is set. If it is set then show the message to open the login page again
  useEffect(() => {
    const checkLogin = async () => {
      const result = await chrome.storage.local.get(["FIREBASE_LOGIN"]);
      if (result.FIREBASE_LOGIN) {
        setShowSignIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div>
      {showSignIn ? <SignIn /> : <div>Sign In page is open</div>}
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 