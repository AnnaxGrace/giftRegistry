import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddGift({ giftInputs, handleChange, ownerAddGift, memberAddGift, whoseList, memberUID }) {

    return (
        <Form style={{ fontSize: 30 }}>
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
            {whoseList === 'member' &&
                <>
                    <p>Private to recipient?</p>
                    <Form.Check
                        inline
                        label="TRUE"
                        name="private"
                        type='radio'
                        id={`true`}
                    />
                    <Form.Check
                        inline
                        label="FALSE"
                        name="private"
                        type='radio'
                        id={`false`}
                    />
                    <p style={{ marginTop: 30 }}>Has this gift been purchased already?</p>
                    <Form.Check
                        inline
                        label="TRUE"
                        name="purchased"
                        type='radio'
                        id={`true`}
                    />
                    <Form.Check
                        inline
                        label="FALSE"
                        name="purchased"
                        type='radio'
                        id={`false`}
                    />
                    <p style={{ marginBottom: 30 }}></p>

                </>
            }
            <Button onClick={whoseList === 'member'? (event) => memberAddGift(event, memberUID) : ownerAddGift} variant="dark">
                Submit
            </Button>
        </Form>
    );
}

export default AddGift;
