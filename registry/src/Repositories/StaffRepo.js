
// Staff Page Functions

/**
 * Sorts data by serial number. Takes off the 'SK' to sort by number
 * @param {array} data : array of inventory objects
 */
export const sortSerialNumber = (data) => {
  let result = data.sort(function (a, b) {
    var numberA = parseInt(a.serialNumber.substring(2));
    var numberB = parseInt(b.serialNumber.substring(2));
    if (numberA < numberB) {
      return -1;
    }
    if (numberA > numberB) {
      return 1;
    }
    return 0;
  });
  return result;
};

/**
 * Creates list of items where quantity is less than inventory threshold
 * @param {array} data : array of inventory objects
 */
export const createInventoryThresholdList = (data) => {
  let inventoryArray = [];
  data.forEach((item) => {
    if (item.quantity <= item.inventoryThreshold) {
      inventoryArray.push(item.itemName);
    }
  });
  return inventoryArray;
};

/**
 * Show the alert, then remove it after 3 seconds
 * @param {function} alertFunction : useState function to make it reusable for all the alerts
 */
export const showAlerts = (alertFunction) => {
  alertFunction(true);
  const alertInterval = setInterval(function () {
    alertFunction(false);
    clearInterval(alertInterval);
  }, 3000);
};
