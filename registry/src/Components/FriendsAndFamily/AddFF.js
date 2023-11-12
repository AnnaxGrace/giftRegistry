import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';

function AddFF({ FFUsernameInput, handleFFChange, addFF, FF, showAddFFAlert, setShowAddFFAlert }) {
  return (
    <Form style={{ fontSize: 30 }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={FFUsernameInput}
          name="username"
          placeholder="Enter your loved one's username!"
          onChange={handleFFChange}
        />
      </Form.Group>

      <Button onClick={addFF} variant="dark">
        Submit
      </Button>

      {showAddFFAlert &&<Alert variant="danger" onClose={() => setShowAddFFAlert(false)} dismissible>
        <Alert.Heading>There's no one with that username!</Alert.Heading>
        <p>
          Check your spelling and try again!
        </p>
      </Alert>}
    </Form>
  );
}

export default AddFF;
