import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdlhwLLXDpoWM8NIPm5s7u1frjGwYlYnc",
  authDomain: "antech-718a1.firebaseapp.com",
  projectId: "antech-718a1",
  storageBucket: "antech-718a1.appspot.com",
  messagingSenderId: "671309892195",
  appId: "1:671309892195:web:f79798962c274bc10f0656",
  measurementId: "G-NRYCVRKH7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth} 