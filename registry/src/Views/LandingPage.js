import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { firebaseAuth } from "../provider/AuthProvider";
import { giftsCollection } from "../firebase/firebase";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./landing.css";
import ListItem from "../Components/Gift/ListItem";
import AddGift from "../Components/Gift/AddGift";

function LandingPage() {
  const { currentUserUID } = useContext(firebaseAuth);
  const [items, setItems] = useState(null);
  const [giftInputs, setGiftInputs] = useState({ itemName: '', link: '' })
  const [userId, setUserId] = useState(currentUserUID)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGiftInputs((prev) => ({ ...prev, [name]: value }));
  };

  const getUserList = async () => {
    // await currentUserUID !== null;
    console.log(currentUserUID)
    giftsCollection.where("items.uid", "==", currentUserUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('here?')
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setItems(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const ownerAddGift = () => {
    const randomNumbers = uuidv4();
    const itemIdentifier = `item${randomNumbers}`
    console.log(items)
    const addObject = {...items.items, [itemIdentifier]: {
      itemName: giftInputs.itemName,
      link: giftInputs.link,
      privateToOwner: false,
      purchased: false 
    }}
    setItems((prev) => ({
      ...prev, [itemIdentifier]: {
        itemName: giftInputs.itemName,
        link: giftInputs.link,
        privateToOwner: false,
        purchased: false 
      }
    }));
    console.log(addObject)
    const newItem = giftsCollection.doc(currentUserUID);
    newItem.set({
      items: addObject
    });
  }

  // const getFirebase = async () => {
  //   const response = await inventoryCollection.get();
  //   try {
  //     const inventoryData = response.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setItems(inventoryData);
  //     return inventoryData;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // const populateUser = () => {
  //   if (currentUserUID) {
  //     return currentUserUID
  //   } else {
  //     populateUser()
  //   }
  // }

  useEffect(() => {
    console.log(currentUserUID)
    setUserId(currentUserUID)
    // populateUser()
    // setTimeout(() => { getUserList() }, 9000);
    getUserList()
  }, [currentUserUID, userId]);

  return (
    <Container className='containerMargin' fluid={true}>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={5} className='lists'>
          {console.log(items)}
          {items !== null && console.log(items.items)}
          {items !== null && Object.keys(items.items).map((item, index) => (
            <>
              {typeof items.items[item] !== 'string' &&
                <ul id={index}>
                  <ListItem
                    item={items.items[item]}
                  />
                </ul>}
            </>
          ))}

          {/* <Button onClick={addGift}>Add Gift</Button> */}
          <AddGift
            giftInputs={giftInputs}
            handleChange={handleChange}
            ownerAddGift={ownerAddGift}
          />
        </Col>
        <Col md={5} className='lists'>
          others list
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
