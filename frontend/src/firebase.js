// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mernrealestate-1d9fe.firebaseapp.com",
    projectId: "mernrealestate-1d9fe",
    storageBucket: "mernrealestate-1d9fe.firebasestorage.app",
    messagingSenderId: "822263510471",
    appId: "1:822263510471:web:ca4f64701b32d2550b95e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);