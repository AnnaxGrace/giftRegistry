import React from "react";

import Image from 'react-bootstrap/Image'

import Bow from '../../assets/bow.png'

function ListItem({ item }) {
    return (
        <li>
            <Image src={Bow} style={{ height: 50 }} /> 
            <a style={{marginLeft: 20 }} target="_blank" rel="noreferrer" href={item.link}>{item.itemName}</a>
            <p style={{marginLeft: 70 }}>
            </p>
        </li>
    );
}

export default ListItem;
