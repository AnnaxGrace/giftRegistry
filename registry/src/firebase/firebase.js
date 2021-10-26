import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyCb-ntPyOHR-YAkSMexO_BZ0LVShVeE0Fw",
    authDomain: "stickersbysimkaye.firebaseapp.com",
    projectId: "stickersbysimkaye",
    storageBucket: "stickersbysimkaye.appspot.com",
    messagingSenderId: "894493773985",
    appId: "1:894493773985:web:566ac9976c4f3ef5a760e0",
    measurementId: "G-DFJZF5CJ5L"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  firebase.auth();
  const inventoryCollection = firebase.firestore().collection("inventory");
  const usersCollection = firebase.firestore().collection('users');
  
  
  
  export {
    firebase,
    usersCollection,
    inventoryCollection
  };