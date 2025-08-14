// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    "projectId": "oushodcloud-landing-rjfa5",
    "appId": "1:1020680957272:web:9efae3d8c052499764492d",
    "storageBucket": "oushodcloud-landing-rjfa5.firebasestorage.app",
    "apiKey": "AIzaSyBd5V0gLri_TuaRN7tts5Cw93-YKHOIghI",
    "authDomain": "oushodcloud-landing-rjfa5.firebaseapp.com",
    "measurementId": "",
    "messagingSenderId": "1020680957272"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
