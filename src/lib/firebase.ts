import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQVZ7msGQdGLCeCpDw3Bj_tJJXYePkZ_k",
  authDomain: "sample-e6ecf.firebaseapp.com",
  projectId: "sample-e6ecf",
  storageBucket: "sample-e6ecf.firebasestorage.app",
  messagingSenderId: "127675232437",
  appId: "1:127675232437:web:6606691d782b2a76344efc",
  measurementId: "G-2X2ZTJ6C69"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics conditionally (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, auth, db, storage, analytics }; 