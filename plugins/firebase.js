import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnRpqW8gLWIVDekhrEFh5Ud7NwTBMqprA",
  authDomain: "mock-data-2fb9b.firebaseapp.com",
  projectId: "mock-data-2fb9b",
  storageBucket: "mock-data-2fb9b.appspot.com",
  messagingSenderId: "321459148943",
  appId: "1:321459148943:web:8959f0347a98b2342cf8fa"
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
