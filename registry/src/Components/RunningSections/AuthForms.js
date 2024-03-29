import React, { useContext } from "react";

import { firebaseAuth } from "../../provider/AuthProvider";

import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import "./runningSections.scss";
import "./runningSections.css"

function AuthForms({ handleChange, authHandle, auth, setAuth }) {
  const { inputs, errors, loggedIn } = useContext(firebaseAuth);

  return (
    <Form style={{ fontSize: 30 }}>
      <Row>
        <Form.Group className="spacing" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={inputs.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            autoComplete="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {auth === "signup" &&
          <Form.Group className="spacing" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={inputs.userName}
              name="userName"
              onChange={handleChange}
              type="text"
              placeholder="Enter UserName"
            // autoComplete="email"
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </Form.Group>
        }

        <Form.Group className="spacing" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={inputs.password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <Form.Text className="text-muted">
            Must be at least 6 characters
          </Form.Text>
        </Form.Group>
        {auth === "signup" ? (
          <>
            <div className="btn-div margin-top">
              <button onClick={authHandle} type="submit">
                Sign-Up
              </button>
            </div>

            <div className="margin-top">
              <p>
                Already signed up?{" "}
                <button type="button" onClick={() => setAuth("login")}>
                  Log-In
                </button>{" "}
                instead!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="btn-div margin-top">
              <Button onClick={authHandle} variant="primary" type="submit">
                Log-In
              </Button>
            </div>
            <div className="margin-top">
              Need to sign up?{" "}
              <button type="button" onClick={() => setAuth("signup")}>
                Sign-Up
              </button>{" "}
              instead!
            </div>
          </>
        )}
      </Row>
      {loggedIn
        ? ""
        : errors.length > 0
          ? errors.map((error) => <p style={{ color: "red" }}>{error}</p>)
          : null}
    </Form>
  );
}

export default AuthForms;
