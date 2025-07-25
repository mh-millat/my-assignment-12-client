import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID
    apiKey: "AIzaSyCILzJafbdtBaChfKZaUhZygKRUnoXWsH4",
    authDomain: "my-assignment-12-cffd7.firebaseapp.com",
    projectId: "my-assignment-12-cffd7",
    storageBucket: "my-assignment-12-cffd7.firebasestorage.app",
    messagingSenderId: "1013475248795",
    appId: "1:1013475248795:web:73dfd0adb0c1ee4c3a943e"

};

export const app = initializeApp(firebaseConfig);
