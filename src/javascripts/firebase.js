import * as firebase from "firebase";
import sectionModel from "./models/section";
import PanelModel from "./models/Panel";
let database;
export const init = () => {
  let config = {
    apiKey: "AIzaSyCwR2GCeE7Mqn1-vZp_s0tDJLgqmn2pZWk",
    authDomain: "goldenlayouts.firebaseapp.com",
    databaseURL: "https://goldenlayouts.firebaseio.com",
    projectId: "goldenlayouts",
    storageBucket: "goldenlayouts.appspot.com",
    messagingSenderId: "116575294400"
  };

  try {
    firebase.initializeApp(config);
    database = firebase.database();
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
};

// retrieve from firebase
// return promise object
export const getStatesDB = () => {
  return database.ref("/").once("value");
};

// add new section
export const addSection = (panels, newPanel, count) => {
  let key = database.ref("/").push().key; //getting an id
  // creating new golden-layout panelModel
  const panelModel = PanelModel(
    key,
    newPanel.panelTitle,
    newPanel.panelType,
    newPanel.panelPayload
  );

  //adding new panel to the existing panels
  const updatedPanels = panels.push(panelModel);
  //creating new state node to be saved in database
  let model = sectionModel(
    key,
    updatedPanels.toArray(),
    count,
    firebase.database.ServerValue.TIMESTAMP
  );
  // saving the new state to the app datatbase
  return database.ref("/" + key).set(model);
};

// update count value for current section
export const updateCount = newValue => {
  return new Promise((resolve, reject) => {
    database
      .ref("/")
      .limitToLast(1) //getting current section
      .once("child_added")
      .then(state => {
        let key = state.val().id;
        database
          .ref("/" + key + "/count")
          .set(newValue)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

// add new todo item into specified section
export const updateConfig = newValue => {
  return database
    .ref("/")
    .limitToLast(1)
    .once("child_added")
    .then(state => {
      let key = state.val().id;
      database
        .ref("/" + key + "/")
        .update({ config: newValue })
        .then(res => {
          // resolve(res);
        })
        .catch(error => {
          // reject(error);
        });
    });
};
