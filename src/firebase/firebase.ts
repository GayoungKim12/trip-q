// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKOTgz6Y2Z8utmxAAikWTdoogUAZt47Z8",
  authDomain: "tripq-1c4f0.firebaseapp.com",
  projectId: "tripq-1c4f0",
  storageBucket: "tripq-1c4f0.appspot.com",
  messagingSenderId: "53027017823",
  appId: "1:53027017823:web:bd625dc305db8d744b77ea",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const authService = getAuth();
