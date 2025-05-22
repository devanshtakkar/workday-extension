import { DASHBOARD_URL } from "../CONSTANTS";
import { v4 as uuidv4 } from "uuid";
export default function SignIn() {
  const handleSignIn = async () => {
    // generate a random login id
    let FIREBASE_LOGIN = uuidv4();
    await chrome.storage.local.set({ FIREBASE_LOGIN });
    chrome.tabs.create({
      url: `${DASHBOARD_URL}/auth?login=${FIREBASE_LOGIN}`,
    });
  };
  return (
    <div className="p-4 w-64 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold text-gray-800 mb-2">
        Workday Assistant
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        AI-powered assistance for Workday job applications
      </p>
      <button
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  );
}
