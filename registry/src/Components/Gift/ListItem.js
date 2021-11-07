import React, { useState } from "react";

import { giftsCollection } from "../../firebase/firebase";

import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


import Bow from '../../assets/bow.png';
import './gift.css';

function ListItem({ item, whoseList, username, itemIdentifier, memberGiftList }) {
    const [purchased, setPurchased] = useState(item.purchased)
    const [show, setShow] = useState(false);

    const handlePurchaseCheck = (event) => {
        setPurchased(event.target.checked)
        let itemNumber;
        for (var prop in itemIdentifier) {
            if (itemIdentifier.hasOwnProperty(prop)) {
                if (itemIdentifier[prop].itemName === item.itemName)
                    itemNumber = prop;
            }
        }
        const addObject = {
            ...memberGiftList.items, [itemNumber]: {
                itemName: item.itemName,
                link: item.link,
                privateToOwner: item.privateToOwner,
                purchased: event.target.checked
            }
        }
        const newItem = giftsCollection.doc(memberGiftList.items.uid);
        newItem.set({
            items: addObject
        });
    }

    const removeItemFromList = async () => {
        let itemNumber;
        for (var prop in itemIdentifier) {
            if (itemIdentifier.hasOwnProperty(prop)) {
                if (itemIdentifier[prop].itemName === item.itemName)
                    itemNumber = prop;
            }
        }
        console.log(memberGiftList)
        console.log(memberGiftList)
        delete memberGiftList.items[itemNumber]
        console.log(memberGiftList)
        const addObject = {
            ...memberGiftList.items
        }
        const newItem = giftsCollection.doc(memberGiftList.items.uid);
        await newItem.set({
            items: addObject
        });
        handleClose()
        window.location.reload(false);

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <li>
            <Image src={Bow} style={{ height: 50 }} />
            <a style={{ marginLeft: 20, color: 'white', fontSize: 35 }} target="_blank" rel="noreferrer" href={item.link}>{item.itemName}</a>
            <i onClick={handleShow} class="fas fa-trash" style={{ marginLeft: 40, fontSize: 30 }}></i>
            <p style={{ marginLeft: 70 }}>
                {whoseList === 'member' &&
                    <>
                        {item.privateToOwner &&
                            <Form.Group className="mb-3" controlId="privateCheckbox">
                                <Form.Check type="checkbox" checked disabled label={`${username} doesn't see this item!`} />
                            </Form.Group>
                        }
                        <Form.Group style={{ fontSize: 25 }} className="mb-3" controlId="purchaseCheckbox">
                            <Form.Check type="checkbox" size="lg" name='purchased' checked={purchased} onChange={handlePurchaseCheck} label='purchased' />
                        </Form.Group>
                    </>
                }
            </p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this item from this list?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={removeItemFromList}>
                        Delete item
                    </Button>
                </Modal.Footer>
            </Modal>
        </li >
    );
}

export default ListItem;
