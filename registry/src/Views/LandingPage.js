import React, { useEffect, useState, useContext } from "react";

import { firebaseAuth } from "../provider/AuthProvider";
import { giftsCollection } from "../firebase/firebase";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./landing.css";
import Button from "react-bootstrap/Button";
import ListItem from "../Components/Gift/ListItem";

function LandingPage() {
  const { currentUserUID } = useContext(firebaseAuth);
  const [items, setItems] = useState(null);
  const [userId, setUserId] = useState(currentUserUID)

  const getUserList = async () => {
    giftsCollection.where("uid", "==", currentUserUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setItems(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const addGift = () => {
    const newItem = giftsCollection.doc(currentUserUID);
    newItem.set({
      uid: currentUserUID,
      item: {
        itemName: 'party',
        link: 'its a link',
        privateToOwner: false,
        purchased: false
      }
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
    // populateUser()
    // setTimeout(() => { getUserList() }, 9000);
    getUserList()
  }, [currentUserUID]);

  return (
    <Container className='containerMargin' fluid={true}>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={5} className='lists'>
          {console.log(items)}
          {items !== null && Object.keys(items).map((item, index) => (
            <>
              {typeof items[item] !== 'string' &&
                <ul id={index}>
                  <ListItem
                    item={items[item]}
                  />
                </ul>}
            </>
          ))}

          <Button onClick={addGift}>Add Gift</Button>
        </Col>
        <Col md={5} className='lists'>
          others list
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
