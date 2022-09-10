import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDyQ7FnaORGjv3fU80z1JGKRqcrfPLcBac",
    authDomain: "bidapoly-crime-app.firebaseapp.com",
    projectId: "bidapoly-crime-app",
    storageBucket: "bidapoly-crime-app.appspot.com",
    messagingSenderId: "117656526145",
    appId: "1:117656526145:web:0ba19fd2e48d3c8e37d5c0",
    measurementId: "G-HQ5NVHTSW0"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



