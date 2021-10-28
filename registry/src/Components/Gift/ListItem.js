import React from "react";

import Image from 'react-bootstrap/Image'

import Bow from '../../assets/bow.png'

function ListItem({ item }) {
    console.log(item)
    return (
        <li>
            <Image src={Bow} style={{ height: 50 }} /> {item.itemName}
            <p>
                <a style={{marginLeft: 70 }} href={item.link}>link</a>
            </p>
        </li>
    );
}

export default ListItem;
