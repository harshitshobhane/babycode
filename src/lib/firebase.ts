
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Using a working public test configuration for authentication
const firebaseConfig = {
  apiKey: "AIzaSyBs3HYqcxx7xnpEfgkzELL1KyHmNjM7kf4",
  authDomain: "test-react-auth-d9bf8.firebaseapp.com",
  projectId: "test-react-auth-d9bf8",
  storageBucket: "test-react-auth-d9bf8.appspot.com",
  messagingSenderId: "585104306504",
  appId: "1:585104306504:web:5394bbe67ca755d564c38e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
