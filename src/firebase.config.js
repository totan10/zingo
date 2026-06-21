// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Add these imports for authentication


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTNmWeYthqfCVhqkshNYex5FG59f2hAKY",
  authDomain: "zingo-88d84.firebaseapp.com",
  databaseURL: "https://zingo-88d84-default-rtdb.firebaseio.com",
  projectId: "zingo-88d84",
  storageBucket: "zingo-88d84.firebasestorage.app",
  messagingSenderId: "249535229776",
  appId: "1:249535229776:web:1d48fb00b9d2c2c0634655",
  measurementId: "G-R5KGJGBPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize the authentication instance
const provider = new GoogleAuthProvider(); // Create Google authentication provider instance

export { app, database, auth, provider };
