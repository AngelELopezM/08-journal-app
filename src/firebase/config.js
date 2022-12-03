// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxjZ_E15ZLmJZ13vPw6Yjy45u0FgLih3U",
    authDomain: "react-practice-16176.firebaseapp.com",
    projectId: "react-practice-16176",
    storageBucket: "react-practice-16176.appspot.com",
    messagingSenderId: "89146715869",
    appId: "1:89146715869:web:2bd60b6d8c6648dc74b534"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);