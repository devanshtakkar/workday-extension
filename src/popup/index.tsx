import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SignIn from './SignIn';
import { DASHBOARD_URL } from "../CONSTANTS";

const App: React.FC = () => {
  let [showSignIn, setShowSignIn] = useState(true);
  let [firebaseLoginId, setFirebaseLoginId] = useState<string | null>(null);

  // when the popup is opened, check if the FIREBASE_LOGIN is set. If it is set then show the message to open the login page again
  useEffect(() => {
    const checkLogin = async () => {
      const result = await chrome.storage.local.get(["FIREBASE_LOGIN"]);
      if (result.FIREBASE_LOGIN) {
        setShowSignIn(false);
        setFirebaseLoginId(result.FIREBASE_LOGIN);
      }
    };
    checkLogin();
  }, []);

  const handleOpenSignInPageAgain = () => {
    if (firebaseLoginId) {
      chrome.tabs.create({
        url: `${DASHBOARD_URL}/auth?login=${firebaseLoginId}`,
      });
    }
  };

  return (
    <div>
      {showSignIn ? (
        <SignIn />
      ) : (
        <div className="p-4 w-64 bg-white shadow-md rounded-md text-center">
          <p className="text-sm text-gray-700 mb-3">Sign In page is already open in another tab.</p>
          <a
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={handleOpenSignInPageAgain}
          >
            Open Sign In Page Again
          </a>
        </div>
      )}
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