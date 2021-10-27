import React from "react";

function ListItem({ item }) {
    console.log(item)
    return (
        <li>
            {item.itemName}
            <p> - {item.link} </p>
        </li>
    );
}

export default ListItem;
