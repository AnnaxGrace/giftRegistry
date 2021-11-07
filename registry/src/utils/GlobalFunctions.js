import { giftsCollection } from "../firebase/firebase";


const getUserList =  (uid) => {
    // await currentUserUID !== null;
    let dataToReturn;
    giftsCollection.where("items.uid", "==", uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => { 
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data())
                console.log(doc.data())
                dataToReturn = doc.data();
                // resolve(doc.data())
                // return (doc.data());
                //   setItems(doc.data())
            });
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        return(dataToReturn);
}

export { getUserList };