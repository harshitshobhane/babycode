
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Using a public test configuration that will work for authentication
const firebaseConfig = {
  apiKey: "AIzaSyBxZ22OmAKxKHeN8s7AuvFRJLGZrQU-GRE",
  authDomain: "student-dashboard-demo.firebaseapp.com",
  projectId: "student-dashboard-demo",
  storageBucket: "student-dashboard-demo.appspot.com",
  messagingSenderId: "159499217655",
  appId: "1:159499217655:web:f83c1f62f7c156c983fb6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
