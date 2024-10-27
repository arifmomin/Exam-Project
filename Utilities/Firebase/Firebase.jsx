import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCN_qYK0Vsr9kQZf6kunDlSgauG3eHAEbg",
  authDomain: "e-commerce-website-cb82b.firebaseapp.com",
  projectId: "e-commerce-website-cb82b",
  storageBucket: "e-commerce-website-cb82b.appspot.com",
  messagingSenderId: "956192735932",
  appId: "1:956192735932:web:942df668e09d61b08006b9"
};
export const dbapp = initializeApp(firebaseConfig);