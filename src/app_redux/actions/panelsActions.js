//** PANELS EVENTS PAGE*/
import actionType from "./index";
import {
  getStatesDB,
  addSection,
  updateConfig
} from "../../javascripts/firebase";

export const addNewPanel = panel => {
  console.log("Dispatching addNewPanel: ", panel);
  return {
    type: actionType.ADD_NEW_PANEL,
    panel
  };
};

export const deletePanel = panelId => {
  console.log("Dispatching deletePanel: ", panelId);
  return {
    type: actionType.DELETE_PANEL,
    panelId
  };
};

//firebase
export const loadSections = () => {
  return dispatch => {
    dispatch({
      type: actionType.LOAD_PANELS_REQUEST
    });
    getStatesDB()
      .then(statesDb => {
        dispatch({
          type: actionType.LOAD_PANELS_SUCCESS,
          payload: statesDb.val()
        });
        dispatch({
          type: "LOAD_COUNT_SUCCESS",
          payload: statesDb.val()
        });
      })
      .catch(error => {
        console.log("error", error);
        dispatch({
          type: actionType.LOAD_PANELS_FAILED,
          payload: error
        });
      });
  };
};

export const createSection = (panels, newPanel, count) => {
  return dispatch => {
    dispatch({
      type: actionType.ADD_PANELS_REQUEST
    });
    addSection(panels, newPanel, count)
      .then(res => {
        loadSections()(dispatch); //refresh the data to keep up-to-date
        dispatch({
          type: actionType.ADD_PANELS_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.ADD_PANELS_FAILED,
          payload: error
        });
      });
  };
};

export function updateConfigValue(newValue) {
  // return dispatch => {
  //   dispatch({
  //     type: "UPDATE_CONFIG_REQUEST"
  //   });
  updateConfig(newValue)
    .then(res => {
      // dispatch({
      //   type: "UPDATE_CONFIG_SUCCESS"
      // });
    })
    .catch(error => {
      // dispatch({
      //   type: "UPDATE_CONFIG_FAILED",
      //   payload: error
      // });
    });
  // };
}
