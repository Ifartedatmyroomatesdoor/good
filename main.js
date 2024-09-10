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
