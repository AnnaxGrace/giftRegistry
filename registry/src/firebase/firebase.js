import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS0MEPVqGh2WHDI0NnZ_reYLoQFadJwro",
  authDomain: "giftregistry-67cf5.firebaseapp.com",
  projectId: "giftregistry-67cf5",
  storageBucket: "giftregistry-67cf5.appspot.com",
  messagingSenderId: "432757216623",
  appId: "1:432757216623:web:c675babf6dd0fe76b2049a"
};
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  firebase.auth();
  const giftsCollection = firebase.firestore().collection('gifts');
  const usersCollection = firebase.firestore().collection('users');
  
  
  
  export {
    firebase,
    usersCollection,
    giftsCollection
  };