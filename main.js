// Import Firebase SDK functions (make sure you're using Firebase v9 syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDmEc-So0p1YAyL4IAXJfykxT1FpveWZQk",
    authDomain: "danii2-s-archive.firebaseapp.com",
    databaseURL: "https://danii2-s-archive-default-rtdb.firebaseio.com",
    projectId: "danii2-s-archive",
    storageBucket: "danii2-s-archive.appspot.com",
    messagingSenderId: "33435698450",
    appId: "1:33435698450:web:48315e7d5fb743b3955fcb",
    measurementId: "G-YG71QD39G4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
