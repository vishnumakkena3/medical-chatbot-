// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg8qPVD5Bj47_QYF0HhErcvc-gEYq6caw",
  authDomain: "medicalchatbot-4eea2.firebaseapp.com",
  projectId: "medicalchatbot-4eea2",
  storageBucket: "medicalchatbot-4eea2.firebasestorage.app",
  messagingSenderId: "338215228925",
  appId: "1:338215228925:web:03498ef60fe216e383f594",
  measurementId: "G-F6JDVGL6VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);