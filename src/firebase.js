// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlqzHbdFv2gi3AllYwHmGzKQgp-Lqar8Y",
  authDomain: "podcast-app-react-107ff.firebaseapp.com",
  projectId: "podcast-app-react-107ff",
  storageBucket: "podcast-app-react-107ff.appspot.com",
  messagingSenderId: "768851631877",
  appId: "1:768851631877:web:63fc2f2bed51c2e963216c",
  measurementId: "G-YMQY3BN88T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export {auth,db,storage};
