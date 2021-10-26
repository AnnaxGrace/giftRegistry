import { usersCollection } from "../firebase/firebase";

//ProductPage.js

//Sort functionality Section

/**
 * Sorts through the array by name a-z
 * @param {array} data : array of inventory items
 */
export const sortName = (data) => {
  let result = data.sort(function (a, b) {
    var nameA = a.itemName.toUpperCase().replace(/"/g, "");
    var nameB = b.itemName.toUpperCase().replace(/"/g, "");
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return result;
};

/**
 * Sorts through the array by price depending on order parameter asc/desc
 * @param {string} order : is either high or low, to determine whether to search asc or desc
 * @param {array} data : array of inventory items
 */
export const sortPrice = (order, data) => {
  let result = data.sort(function (a, b) {
    var priceA = a.price;
    var priceB = b.price;
    if (priceA < priceB) {
      let priceOrder = order === "high" ? 1 : -1;
      return priceOrder;
    }
    if (priceA > priceB) {
      let priceOrder = order === "high" ? -1 : 1;
      return priceOrder;
    }
    return 0;
  });
  return result;
};



// ****************

//   ProductDetailModal.js

/**
 * Gets the current cart from local storage
 * Manipulates that cart data with updateCart
 * and sets the new local storage cart
 * @param {number} amount : quantity chosen to add to cart
 * @param {string} name : name of the item
 * @param {object} itemData : The item that we want to add to the cart
 */
export const updateLocalStorage = (amount, name, itemData) => {
  const localStorageData = JSON.parse(localStorage.getItem("cart"));
  let updatedCart = updateCart(localStorageData, name, amount, itemData);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

/**
 * Gets the current cart from the user's inventory
 * Manipulates that cart data with updateCart
 * Sets the new inventory of the user
 * @param {object} user : current user information that is logged in
 * @param {number} amount : quantity chosen to add to cart 
 * @param {string} name : name of the item
 * @param {object} itemData : The item that we want to add to the cart
 */
export const updateUserInventory = (user, amount, name, itemData) => {
  const currentUID = user.uid;
  usersCollection
    .doc(currentUID)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      let updatedCart = updateCart(data.inventory, name, amount, itemData);
      const updateUser = usersCollection.doc(currentUID);
      updateUser.set({
        uid: currentUID,
        type: data.type,
        inventory: updatedCart,
      });
    });
};

/**
 * Takes data retrieves and sets it into a local array to manipulate it
 * If the cart was not empty, add those items
 * If the cart was not empty, check that we are not trying to add a duplicate
 * Add the new item to the array
 * @param {object} previousData : The cart data grabbed, whether from local storage or user database
 * @param {string} name : name of that item
 * @param {number} amount : quantity chosen to add to cart
 * @param {object} itemData : The item that we want to add to the cart
 */
const updateCart = (previousData, name, amount, itemData) => {
  let localStorageArray = [];
  if (previousData) {
    previousData.forEach((item) => {
      localStorageArray.push(item);
    });
  }
  let itemsAdded = amount;
  if (localStorageArray.length > 0) {
    localStorageArray.forEach((item, i) => {
      if (item.item[1].itemName === name) {
        const totalQuantity = amount + item.item[0];
        localStorageArray.splice(i, 1);
        itemsAdded = totalQuantity;
      }
    });
  }
  localStorageArray.push({ item: [itemsAdded, itemData] });
  return localStorageArray;
};
