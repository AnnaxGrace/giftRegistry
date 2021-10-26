import { inventoryCollection } from "../firebase/firebase";


  export const getFirebase = async () => {
    const response = await inventoryCollection.get();
    try {
      const inventoryData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return inventoryData;
    } catch (error) {
      return error;
    }
  };

  // export { getFirebase }