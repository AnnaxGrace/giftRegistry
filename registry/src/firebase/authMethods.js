import firebase from "firebase/app";
import { usersCollection } from "./firebase";

//This file connects with provider/AuthProvider
export const authMethods = {
  signup: (email, password, setErrors, setCurrentUserType) => {
    firebase
      .auth() 
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Creates a corresponding firestore user with the authentication user uid
        const { user } = res;
        const userProfile = {
          uid: user.uid,
          type: "customer",
          inventory: [],
        };
        usersCollection.doc(user.uid).set(userProfile);
        //Grabs the user created and sets the current type with 'customer'
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const currentUID = user.uid;
            usersCollection
              .doc(currentUID)
              .get()
              .then((snapshot) => {
                const data = snapshot.data();
                setCurrentUserType(data.type);
              });
          }
        });
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  login: (email, password, setErrors, setCurrentUserType) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        //Grabs the user loggedIn an sets the current type with 'staff'
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const currentUID = user.uid;
            usersCollection
              .doc(currentUID)
              .get()
              .then((snapshot) => {
                const data = snapshot.data();
                setCurrentUserType(data.type);
              });
          }
        });
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signout: (setLoggedIn, setErrors) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setLoggedIn(false);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
};
