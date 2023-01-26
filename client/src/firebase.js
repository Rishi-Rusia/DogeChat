import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//  apiKey: "AIzaSyCpRej_KS3YIT-BYHlCXds63NlFe-wK_4E",
//   authDomain: "dogechat-75e2a.firebaseapp.com",
//   projectId: "dogechat-75e2a",
//   storageBucket: "dogechat-75e2a.appspot.com",
//   messagingSenderId: "235863992207",
//   appId: "1:235863992207:web:fcc9165d806b0676800dfa",
//   measurementId: "G-XSH5NKK9Q7",

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
