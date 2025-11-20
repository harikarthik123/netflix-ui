
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWtwc5cKeSaHC7wcgmL-MgbNiTZAM6p5s",
  authDomain: "react-netflix-clone-a471d.firebaseapp.com",
  projectId: "react-netflix-clone-a471d",
  storageBucket: "react-netflix-clone-a471d.firebasestorage.app",
  messagingSenderId: "994220254032",
  appId: "1:994220254032:web:c1d122e27baa3f3d574255",
  measurementId: "G-565Z6MCY1J"
};

const app = initializeApp(firebaseConfig);


export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);