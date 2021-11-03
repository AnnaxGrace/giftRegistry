import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddFF({ FFUsernameInput, handleFFChange, addFF, FF }) {

    return (
        <Form>
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
        </Form>
    );
}

export default AddFF;
