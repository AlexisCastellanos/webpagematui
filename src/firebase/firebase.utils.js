import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const config = {
  apiKey: "AIzaSyCpEzrPAXNsIHKCiLoWqeh9Ln7nHhEp13o",
  authDomain: "crwn-db-mod.firebaseapp.com",
  databaseURL: "https://crwn-db-mod.firebaseio.com",
  projectId: "crwn-db-mod",
  storageBucket: "crwn-db-mod.appspot.com",
  messagingSenderId: "176035101119",
  appId: "1:176035101119:web:91131e583c9d3204f5c90a",
  measurementId: "G-ZDZ7T9TF43"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  const collectionRef = firestore.collection('users');
  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  console.log("snapShotsnapShot");
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const admin = false;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        admin,
        ...additionalData
      })
    } catch (error) {
      console.log('error catching user', error.message);
    }
  }
  console.log("userRefuserRef");
  console.log(userRef);
  return userRef;

}


var docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: firebase.firestore.Timestamp.fromDate(new Date()),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo"
    }
  }
};
export const dummy = (currentUser, items, total) => {
  const createdAt = new Date();
  console.log(currentUser);
  var docData = {
    currentUserID: currentUser.id,
    items: items,
    total: total,
    date: createdAt,
    name: "name 1",
    personal: {
      address: {
        street: "street add",
        city: "city name",
        code: "123",
        state: "state name",
        country: "country name",
        ref: "referances",
        phone1: "123-123-1233",
        phone2: "321-321-321",
      },
    },
  };
  firestore.collection("orders").doc(`${currentUser.id}`).collection("boughts").doc(`${createdAt}`).set(docData).then(function () {
    console.log("Document successfully written! -> ORDERS");
  })
    .catch(function (error) {
      console.error("Error writing document  -> ORDERS: ", error);
    });

  firestore.collection("pendings").doc(`${createdAt}`).set(docData).then(function () {
    console.log("Document successfully written! -> PENDINGS");
  })
  firestore.collection("pendingsx").add({
    docData
  }).then(function () {
    console.log("Document successfully written! -> PENDINGSXXX");
  })
    .catch(function (error) {
      console.error("Error writing document:  -> PENDINGS", error);
    });
}


export const getOrdersFromFirebase = () => {
  let data = null;
  // const userRef=firestore.collection("pendings");
  // const snapShot=await userRef.get();


  // console.log("getOrdersFromFirebaseasync");
  // console.log(userRef);
  // console.log(snapShot);

  firestore.collection("pendings").get().then(function (querySnapshot) {
    console.log("pendings");

    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      data = doc.data()
    });

  });
  return docData
}

export const convertCollectionsSnapShotToMap = (collections,filt) => {
  const transformedCollection = collections.docs.map(
    doc => {
      const { personal, items, currentUserID, total } = doc.data();
      console.log("doc.data()");
      console.log(doc.data());
      return {
        currentUserID: currentUserID,
        id: doc.id,
        personal,
        items,
        total
      };

    });
  // console.log(transformedCollection);
  return transformedCollection;

  // return transformedCollection.reduce((accumulator,collection)=>{
  //   accumulator[collection.personal]=collection;
  //   return accumulator;
  // },{});
};

export const convertCollectionsSnapShotToMap2 = (collections) => {
  const transformedCollection = collections.docs.map(
    doc => {
      const { personal, items, currentUserID, total } = doc.data();

      return {
        // routeName:encodeURI(doc.id.toLowerCase()),
        currentUserID: currentUserID,
        id: doc.id,
        personal,
        items,
        total
      };

    });
  // console.log(transformedCollection);
  return transformedCollection;

  // return transformedCollection.reduce((accumulator,collection)=>{
  //   accumulator[collection.personal]=collection;
  //   return accumulator;
  // },{});
};

export const dummy2 = () => {
  console.log("send 2 Firbase Database");
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
