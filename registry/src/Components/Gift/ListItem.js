import React from "react";

function ListItem({ item }) {
    console.log(item)
  return (
     <li>
         {item.itemName}
     </li> 
  );
}

export default ListItem;
