import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { firebaseAuth } from "../../provider/AuthProvider";

import AuthForms from "./AuthForms";

import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import Avatar from "../../assets/gus_2_112x112.png";

// import "./runningSections.scss";

function Header() {
  const [auth, setAuth] = useState("signup");

  const {
    handleSignup,
    setInputs,
    handleLogIn,
    handleSignout,
    loggedIn,
  } = useContext(firebaseAuth);

  /**
   * Checks to see if the button clicked on was sign up or log in, and handles accordingly
   * @param {*} e : used to stop refresh
   */
  const authHandle = (e) => {
    e.preventDefault();
    if (auth === "signup") {
      handleSignup();
    } else if (auth === "login") {
      handleLogIn();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header>
      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header className="accordion">
            <Row className="user-row">
              {!loggedIn && <Accordion.Toggle
                id="accordion-toggle"
                as={Button}
                variant="link"
                eventKey="0"
              >
                {!loggedIn && "Sign Up/Log-in"}
              </Accordion.Toggle>}
              {loggedIn && (
                <button variant="link" id="signout-btn" onClick={handleSignout}>
                  sign out
                </button>
              )}
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {!loggedIn ? (
                <AuthForms
                  authHandle={authHandle}
                  auth={auth}
                  setAuth={setAuth}
                  handleChange={handleChange}
                />
              ) : (
                <p>Thanks for signing in!</p>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </header>
  );
}

export default Header;
