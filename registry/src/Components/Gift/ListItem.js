import React, { useState } from "react";

import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";


import Bow from '../../assets/bow.png';
import './gift.css';

function ListItem({ item, whoseList, username }) {
    const [purchased, setPurchased] = useState(item.purchased)

    const handlePurchaseCheck = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.checked)
    }

    return (
        <li>
            <Image src={Bow} style={{ height: 50 }} />
            <a style={{ marginLeft: 20, color: 'white', fontSize: 35 }} target="_blank" rel="noreferrer" href={item.link}>{item.itemName}</a>
            <p style={{ marginLeft: 70 }}>
                {whoseList === 'member' &&
                    <>
                        {item.privateToOwner &&
                            <Form.Group className="mb-3" controlId="privateCheckbox">
                                <Form.Check type="checkbox" checked disabled label={`${username} doesn't see this item!`} />
                            </Form.Group>
                        }
                        <Form.Group style={{fontSize: 25 }} className="mb-3" controlId="purchaseCheckbox">
                            <Form.Check type="checkbox" size="lg" name='purchased' checked={purchased} onChange={handlePurchaseCheck} label='purchased' />
                        </Form.Group>
                    </>
                }
            </p>
        </li>
    );
}

export default ListItem;
