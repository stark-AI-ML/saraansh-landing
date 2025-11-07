import { initializeApp } from "firebase/app";


// import { config } from "dotenv";
// config(); 
// import { configDotenv } from "dotenv";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


// const firebaseConfig = {
//   apiKey: import.meta.process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID, 
//   measurementId: process.env.Firebase_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID, 
  measurementId: import.meta.env.VITE_Firebase_MEASUREMENT_ID
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
  }



  async signInWithGoogle() {

      //  getRedirectResult(this.auth)
      //   .then((result) => {
      //     // If 'result' is not null, it means the user was just redirected back
      //     // and we have their sign-in information.
      //     if (result) {
      //       const user = result.user;
      //       console.log("Signed in with redirect:", user);

      //       // You can now use the 'user' object to update your UI or store data.
      //       // Example:
      //       // document.getElementById('welcome-message').textContent = `Welcome, ${user.displayName}!`;
      //     }
      //   })
      //   .catch((error) => {
      //     // Handle errors here, such as cancelled sign-in
      //     console.error("Redirect sign-in error:", error.message);
      //   });

    try {
      // console.log(this.firebaseData);

      getRedirectResult(this.auth);

      const result = await signInWithRedirect(this.auth, this.provider);
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
    onAuthStateChanged(this.auth, callback);
  }
}
