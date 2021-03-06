import firebase from "firebase/app";
import { giftsCollection, usersCollection } from "./firebase";

//This file connects with provider/AuthProvider
export const authMethods = {
  signup: (email, password, userName, setErrors, setCurrentUserUID) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const { user } = res;
        //Creates a giftList with the user uid
        //ANNA START HERE ITEMS: isn't working
        const newCollection = giftsCollection.doc(user.uid)
        newCollection.set({
          items: { uid: user.uid }
        })
        // Creates a corresponding firestore user with the authentication user uid
        const userProfile = {
          uid: user.uid,
          username: userName,
          members: [],
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
                setCurrentUserUID(currentUID);
              });
          }
        });
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  login: (email, password, setErrors, setCurrentUserUID) => {
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
                setCurrentUserUID(currentUID);
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
