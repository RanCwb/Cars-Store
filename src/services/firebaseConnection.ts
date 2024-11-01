// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPIw0x0wrQlmD4eeKzM9o3IIbnaeQ7dKQ",
  authDomain: "car-shop-fdf6e.firebaseapp.com",
  projectId: "car-shop-fdf6e",
  storageBucket: "car-shop-fdf6e.appspot.com",
  messagingSenderId: "667148842920",
  appId: "1:667148842920:web:3cb4df1434a61832a78f9d",
  measurementId: "G-TS12Z717ES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, auth };
