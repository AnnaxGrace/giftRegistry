import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddFF({ FFUsernameInput, handleFFChange, addFF, FF }) {

    return (
        <Form style={{fontSize: 30}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    value={FFUsernameInput}
                    name="username"
                    placeholder="Enter your loved one's username!"
                    onChange={handleFFChange}
                />
            </Form.Group>

            <Button className="submit-btn"onClick={addFF} variant="dark">
                Submit
            </Button>
        </Form>
    );
}

export default AddFF;
