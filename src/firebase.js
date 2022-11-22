import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; //we will use firestore in our project. You must explecitly tell it that fire store will be used
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBuv7T_mxS79uLuxe_oMlfR18r4zKI9yY",
  authDomain: "nextflix-clone-7d60a.firebaseapp.com",
  projectId: "nextflix-clone-7d60a",
  storageBucket: "nextflix-clone-7d60a.appspot.com",
  messagingSenderId: "7392015312",
  appId: "1:7392015312:web:dda554575b8d0b46d87fd5",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = getAuth(); //Always define auth here in firebase config - if not, you'll get Need to provide options, when not being deployed to hosting via source. (app/no-options)
const storage = firebase.storage();
export { db, storage, auth };
