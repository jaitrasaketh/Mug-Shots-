// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0ivGhMGFkaqqqlPM2EQ-pyH6a2V-cMf0",
  authDomain: "mug-shots-9c2b1.firebaseapp.com",
  projectId: "mug-shots-9c2b1",
  storageBucket: "mug-shots-9c2b1.appspot.com",
  messagingSenderId: "1074880190774",
  appId: "1:1074880190774:web:61b9f7219c1c8a6dfe3b97",
  measurementId: "G-23ENRXJ6MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
