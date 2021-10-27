import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddGift({ giftInputs, handleChange, ownerAddGift }) {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    value={giftInputs.itemName}
                    name="itemName"
                    placeholder="Enter item name"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Item Link</Form.Label>
                <Form.Control
                    value={giftInputs.link}
                    name="link"
                    placeholder="Not necessary"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button onClick={ownerAddGift} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddGift;
