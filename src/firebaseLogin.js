import { initializeApp } from "firebase/app";

// import { config } from "dotenv";
// config();
// import { configDotenv } from "dotenv";
import {
  getAuth,
  GoogleAuthProvider,
  // signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_Firebase_MEASUREMENT_ID,
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

export class AuthHandler {
  constructor() {
    this.firebaseData = firebaseConfig;
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.provider = new GoogleAuthProvider();
    this.currentUser = null; 
  }

  async GetAuth() {
    try {
      const result = await getRedirectResult(this.auth);
      console.log(result);
      if (result && result.user) {
        const user = result.user;
        console.log("User signed in:", user);
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error during redirect sign-in:", error);
      return null;
    }
  }
   isSignedIn() {
    
    return !!this.currentUser;
  }

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);

      throw error;
    }
  }

  async signOutUser() {
    try {
      await signOut(this.auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Sign-out Error:", error.message);
      throw error;
    }
  }

    onAuthChange(callback) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      callback(user); // this will fire once Firebase finishes restoring
    });
  }

}
