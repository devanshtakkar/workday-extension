import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  const handleSignIn = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('auth.html') });
  };

  return (
    <div className="p-4 w-64 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold text-gray-800 mb-2">Workday Assistant</h1>
      <p className="text-sm text-gray-600 mb-4">AI-powered assistance for Workday job applications</p>
      <button 
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        onClick={handleSignIn}
      >
        Sign In
      </button>
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