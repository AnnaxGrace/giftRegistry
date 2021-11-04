import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddGift({ giftInputs, handleChange, ownerAddGift, whoseList }) {

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
                    placeholder="optional"
                    onChange={handleChange}
                />
            </Form.Group>
            {whoseList === 'member' && 'checks'}
            <Button onClick={ownerAddGift} variant="dark">
                Submit
            </Button>
        </Form>
    );
}

export default AddGift;
