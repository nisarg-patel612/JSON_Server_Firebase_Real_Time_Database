import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore' 


const firebaseConfig = {
    apiKey: "AIzaSyDVUB0Lwakz_OGrLkffnhFAJseGeuLHAvA",
    authDomain: "simple-crud-app-c9668.firebaseapp.com",
    projectId: "simple-crud-app-c9668",
    storageBucket: "simple-crud-app-c9668.firebasestorage.app",
    messagingSenderId: "330018728933",
    appId: "1:330018728933:web:c320d34cb2749b31985d0c"
  };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider  = new GoogleAuthProvider();
  