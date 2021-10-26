import React, { useEffect, useState, useContext } from "react";

import { firebaseAuth } from "../provider/AuthProvider";
import { giftsCollection } from "../firebase/firebase";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./landing.css";
import Button from "react-bootstrap/Button";

function LandingPage() {
  const { currentUserUID } = useContext(firebaseAuth);

  const getUserList = async () => {
    giftsCollection.where("uid", "==", currentUserUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
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
        privateToOver: false,
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

  useEffect(() => {
    console.log(currentUserUID)
    getUserList()
  }, []);

  return (
    <Container className='containerMargin' fluid={true}>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={5} className='lists'>
          my list
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
