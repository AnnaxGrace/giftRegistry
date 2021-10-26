import { usersCollection } from "../firebase/firebase";

// Cart Product Row
/**
 * Removes item from local storage where the item name matches the value given
 * @param {string} value : e.target.value of item clicked
 */
export const deleteFromLocalStorage = (value) => {
  const localStorageData = JSON.parse(localStorage.getItem("cart"));
  let newCart = localStorageData.filter(
    (item) => item.item[1].itemName !== value
  );
  localStorage.setItem("cart", JSON.stringify(newCart));
};

/**
 * Deletes the item selected from user inventory database then re-renders the cart
 * @param {string} value : e.target.value of item clicked
 * @param {object} user : The user currently logged in
 * @param {function} render : The render function to update the cart in page. Needed to be put in then otherwise it rendered before removed
 */
export const deleteFromUserInventory = (value, user, render) => {
  const currentUID = user.uid;
  usersCollection
    .doc(currentUID)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      let newCart = data.inventory.filter(
        (item) => item.item[1].itemName !== value
      );
      const updateUser = usersCollection.doc(currentUID);
      updateUser
        .set({
          uid: currentUID,
          type: data.type,
          inventory: newCart,
        })
        .then(() => {
          render();
        });
    });
};

// ****************

// PayPal.js
/**
 * Resets the cart to an empty array in the user's firebase database
 * @param {object} user : contains all of the user information
 */
export const clearUserInventory = (user) => {
  const currentUID = user.uid;
  usersCollection
    .doc(currentUID)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      const resetUserCart = usersCollection.doc(currentUID)
      resetUserCart.set({
        uid: currentUID,
        type: data.type,
        inventory: [],
      });
    });
};
