import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import AddFF from "./AddFF";
import "./ff.css";
import FFListWrapper from "./FFListWrapper";

function TabWrapper({
  FFUsernameInput,
  handleFFChange,
  addFF,
  FF,
  giftInputs,
  handleChange,
  ownerAddGift,
  memberAddGift,
  handleRadioChange,
  showAddFFAlert, 
  setShowAddFFAlert
}) {
  return (
    <Tabs
      defaultActiveKey="addNew"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {FF.length > 0 &&
        FF.map((member) => (
          <Tab eventKey={member.username} title={member.username}>
            <FFListWrapper
              uid={member.uid}
              username={member.username}
              giftInputs={giftInputs}
              handleChange={handleChange}
              ownerAddGift={ownerAddGift}
              memberAddGift={memberAddGift}
              handleRadioChange={handleRadioChange}
            />
          </Tab>
        ))}
      <Tab eventKey="addNew" title="Add New">
        <AddFF
          FFUsernameInput={FFUsernameInput}
          handleFFChange={handleFFChange}
          addFF={addFF}
          showAddFFAlert={showAddFFAlert}
          setShowAddFFAlert={setShowAddFFAlert}
        />
      </Tab>
    </Tabs>
  );
}

export default TabWrapper;
