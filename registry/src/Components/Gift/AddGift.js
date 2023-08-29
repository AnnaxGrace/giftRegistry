import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function AddGift({ giftInputs, handleChange, ownerAddGift, memberAddGift, whoseList, memberUID, handleRadioChange, memberGiftList }) {

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
                    <p>Should the recipent not be able to see this item?</p>
                    <Form.Check
                        inline
                        label="Yes"
                        name="privateToOwner"
                        onChange={handleRadioChange}
                        type='radio'
                        id='true'
                    />
                    <Form.Check
                        inline
                        label="No"
                        name="privateToOwner"
                        onChange={handleRadioChange}
                        type='radio'
                        id='false'
                    />
                    <p style={{ marginTop: 30 }}>Have you purchased this gift already?</p>
                    <Form.Check
                        inline
                        label="Yes"
                        name="purchased"
                        type='radio'
                        onChange={handleRadioChange}
                        id='true'
                    />
                    <Form.Check
                        inline
                        label="No"
                        name="purchased"
                        onChange={handleRadioChange}
                        type='radio'
                        id='false'
                    />
                    <p style={{ marginBottom: 30 }}></p>
                </>
            }
            <Button className="submit-btn" onClick={whoseList === 'member'? () => memberAddGift(memberUID, memberGiftList) : ownerAddGift}>
                Submit
            </Button>
        </Form>
    );
}

export default AddGift;
