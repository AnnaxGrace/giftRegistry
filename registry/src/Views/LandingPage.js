import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { firebaseAuth } from "../provider/AuthProvider";
import { giftsCollection, usersCollection } from "../firebase/firebase";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./landing.css";
import ListItem from "../Components/Gift/ListItem";
import AddGift from "../Components/Gift/AddGift";
import AddFF from "../Components/FriendsAndFamily/AddFF";
import TabWrapper from "../Components/FriendsAndFamily/TabWrapper";

function LandingPage() {
  const { currentUserUID } = useContext(firebaseAuth);
  const [items, setItems] = useState({ items: null });
  const [giftInputs, setGiftInputs] = useState({ itemName: '', link: '', privateToOwner: false, purchased: false });
  const [FFUsernameInput, setFFUsernameInput] = useState('')
  const [userId, setUserId] = useState(currentUserUID);
  const [addingItem, setAddingItem] = useState(false);
  const [FF, setFF] = useState([]);
  const [user, setUser] = useState()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGiftInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (event) => {
    const { name, id } = event.target;
    setGiftInputs((prev) => ({ ...prev, [name]: JSON.parse(id) }));
  }

  const handleFFChange = (event) => {
    const { name, value } = event.target;
    setFFUsernameInput(value);
  };

  const getFF = () => {
    usersCollection.where("uid", "==", currentUserUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
          setFF(doc.data().members)
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const getUserList = async () => {
    // await currentUserUID !== null;
    giftsCollection.where("items.uid", "==", currentUserUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.data())
          setItems(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const ownerAddGift = async () => {
    const randomNumbers = uuidv4();
    const itemIdentifier = `item${randomNumbers}`
    const addObject = {
      ...items.items, [itemIdentifier]: {
        itemName: giftInputs.itemName,
        link: giftInputs.link,
        privateToOwner: false,
        purchased: false
      }
    }
    setItems((prev) => ({
      ...prev, [itemIdentifier]: {
        itemName: giftInputs.itemName,
        link: giftInputs.link,
        privateToOwner: false,
        purchased: false
      }
    }));
    const newItem = giftsCollection.doc(currentUserUID);
    await newItem.set({
      items: addObject
    });
    window.location.reload(false);

    setAddingItem(false)
  }

  const memberAddGift = async (memberUID, memberGiftList) => {
    const randomNumbers = uuidv4();
    const itemIdentifier = `item${randomNumbers}`
    const addObject = {
      ...memberGiftList.items, [itemIdentifier]: {
        itemName: giftInputs.itemName,
        link: giftInputs.link,
        privateToOwner: giftInputs.privateToOwner,
        purchased: giftInputs.purchased
      }
    }
    const newItem = giftsCollection.doc(memberUID);
    await newItem.set({
      items: addObject
    });
    setAddingItem(false)
    window.location.reload(false);
  }

  const addFF = () => {
    usersCollection.where("username", "==", FFUsernameInput)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const addNewMember = FF;
          addNewMember.push(doc.data());
          const addNewFF = {
            members: addNewMember,
            uid: user.uid,
            username: user.username
          }
          setFF(addNewMember)
          setUser(addNewFF);
          const newFF = usersCollection.doc(currentUserUID);
          newFF.set(addNewFF);
          setFFUsernameInput('');
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  useEffect(() => {
    if (currentUserUID !== null) {
      setItems({ items: { uid: currentUserUID } })
      setUserId(currentUserUID)
      // populateUser()
      // setTimeout(() => { getUserList() }, 9000);
      // console.log(getUserList(currentUserUID))
      // setItems(getUserList(currentUserUID));
      setItems(getUserList())
      getFF()
    }
  }, [currentUserUID, userId]);

  return (
    <Container className='containerMargin' fluid={true}>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={5} className='lists'>
          <h2 style={{ fontSize: 45 }}>My List</h2>
          {items.items && items.items.uid !== null && Object.keys(items.items).map((item, index) => (
            <>
              {typeof items.items[item] !== 'string' && items.items[item].privateToOwner === false &&
                <ul id={index}>
                  <ListItem
                    item={items.items[item]}
                    whoseList='owner'
                    username="placeholder"
                    itemIdentifier={items.items}
                    memberGiftList={items}

                  />
                </ul>}
            </>
          ))}
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <h3 style={{ fontSize: 40 }}>Add an item</h3>
            {addingItem ? <i onClick={() => { setAddingItem(false) }} style={{ marginLeft: 10, marginTop: 10 }} class="fas fa-minus-square"></i> :
              <i onClick={() => { setAddingItem(true) }} style={{ marginLeft: 10, marginTop: 10 }} className="fas fa-plus-square"></i>}
          </Row>
          {addingItem &&
            <AddGift
              giftInputs={giftInputs}
              handleChange={handleChange}
              ownerAddGift={ownerAddGift}
              memberAddGift={memberAddGift}
              whoseList='owner'
            />}
        </Col>
        <Col md={5} className='lists'>
          <h2 style={{ fontSize: 45 }}>Friends and Family</h2>
          <TabWrapper
            FFUsernameInput={FFUsernameInput}
            handleFFChange={handleFFChange}
            addFF={addFF}
            FF={FF}
            giftInputs={giftInputs}
            handleChange={handleChange}
            ownerAddGift={ownerAddGift}
            memberAddGift={memberAddGift}
            handleRadioChange={handleRadioChange}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
