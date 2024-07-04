// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6V7A9gaGF3OOXh7WayfQdkEDODL3sR_4",
  authDomain: "campfire-ae780.firebaseapp.com",
  projectId: "campfire-ae780",
  storageBucket: "campfire-ae780.appspot.com",
  messagingSenderId: "1004145739582",
  appId: "1:1004145739582:web:e182d01b44c05592658e6f",
  measurementId: "G-T8FJMK3R2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
