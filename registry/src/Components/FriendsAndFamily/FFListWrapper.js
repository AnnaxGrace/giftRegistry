import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";


import { giftsCollection } from "../../firebase/firebase";
import AddGift from "../Gift/AddGift";

import ListItem from "../Gift/ListItem";

function FFListWrapper({ uid, username, giftInputs, handleChange, ownerAddGift, memberAddGift }) {
    const [memberGiftList, setMemberGiftList] = useState({ items: null })
    const [addingFFItem, setAddingFFItem] = useState(false)
    console.log(uid)

    const getUserList = () => {
        giftsCollection.where("items.uid", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    setMemberGiftList(doc.data())
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    useEffect(() => {
        getUserList()
    }, []);

    return (
        <div>
            {memberGiftList.items && memberGiftList.items.uid !== null && Object.keys(memberGiftList.items).map((item, index) => (
                <>
                    {typeof memberGiftList.items[item] !== 'string' &&
                        <ul id={index}>
                            <ListItem
                                whoseList='member'
                                item={memberGiftList.items[item]}
                                username={username}
                            />
                        </ul>}
                </>
            ))}
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <h3 style={{fontSize: 40}}>Add an item</h3>
            {addingFFItem ? <i onClick={() => { setAddingFFItem(false) }} style={{ marginLeft: 10, marginTop: 10 }} class="fas fa-minus-square"></i> :
              <i onClick={() => { setAddingFFItem(true) }} style={{ marginLeft: 10, marginTop: 10 }} className="fas fa-plus-square"></i>}
          </Row>
          {addingFFItem &&
            <AddGift
              giftInputs={giftInputs}
              handleChange={handleChange}
              ownerAddGift={ownerAddGift}
              memberAddGift={memberAddGift}
              whoseList='member'
              memberUID={uid}
            />}
        </div>
    );
}

export default FFListWrapper;
