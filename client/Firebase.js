// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUUAtmIK_sSQqtRjwY1Btcc_5lIneOr50",
  authDomain: "ecommerce-mern-c007a.firebaseapp.com",
  projectId: "ecommerce-mern-c007a",
  storageBucket: "ecommerce-mern-c007a.appspot.com",
  messagingSenderId: "338916330434",
  appId: "1:338916330434:web:616c60fdb3f576c670645b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;