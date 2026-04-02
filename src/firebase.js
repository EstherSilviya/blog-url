// Import Firebase core
import { initializeApp } from "firebase/app";

// 🔥 Import Firestore
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLWfRsZfkC0LnGBHrIWptZaWUBi95XHM4",
  authDomain: "student-blog-e8740.firebaseapp.com",
  projectId: "student-blog-e8740",
  storageBucket: "student-blog-e8740.firebasestorage.app",
  messagingSenderId: "827898120816",
  appId: "1:827898120816:web:f467508c946e4165edc2b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 THIS LINE FIXES YOUR ERROR
export const db = getFirestore(app);