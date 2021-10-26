import React, { useState } from "react";

import { authMethods } from "../firebase/authMethods";
import { usersCollection, firebase } from "../firebase/firebase";

export const firebaseAuth = React.createContext();

//This is our provider that allows the rest of our code to know if the user is logged in, and the type of user, and to be able to login/signup/signout in different files
const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: "", password: "", userName: "" });
  const [errors, setErrors] = useState([]);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const currentUID = user.uid;
      usersCollection
        .doc(currentUID)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          // setCurrentUserType(data.type)
          setLoggedIn(true);
        });
    }
  });

  /**
   * Clears both the input forms and the errors given
   */
  const clearForms = () => {
    setInputs({ email: "", password: "", userName: "" });
    setErrors("");
  };


  /**
   * Signs up the user and then calls the function to clear forms
   */
  const handleSignup = () => {
    authMethods.signup(inputs.email, inputs.password, inputs.userName, setErrors, setCurrentUserType);
    clearForms();
  };
 
  /**
   * Signs out the user and sets the user type to null 
   */
  const handleSignout = () => {
    setCurrentUserType(null);
    authMethods.signout(setLoggedIn, setErrors);
  };

  /**
   * Logs in and calls the function to clear forms
   */
  const handleLogIn = () => {
    authMethods.login(inputs.email, inputs.password, setErrors, setCurrentUserType);
    clearForms();
  };
  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        inputs,
        setInputs,
        errors,
        handleLogIn,
        handleSignout,
        loggedIn,
        currentUserType,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
