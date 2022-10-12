// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwh4dzXR3KF1Ih1buzxNjKLObVVEhGvGA",
  authDomain: "paperfind-e0cf6.firebaseapp.com",
  projectId: "paperfind-e0cf6",
  storageBucket: "paperfind-e0cf6.appspot.com",
  messagingSenderId: "675263949593",
  appId: "1:675263949593:web:ced766c6896dad0eab3388",
  measurementId: "G-7HNXJG26Z2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
