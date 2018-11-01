//*** */HANDLING PANELS EVENTS PAGE/* ***//
import { Map, List } from "immutable";
import actionType from "./../actions/index";
import PanelModel from "./../../javascripts/models/Panel";

//*** HELPER FUNCTIONS */

//TODO: HANDLE  ADD AND DELETE PANELS LOCALLY (still not used)
var nextId = 0;
function addGoldenLayoutChild(state, panel) {
  let newPanel = PanelModel(
    nextId++,
    panel.panelTitle,
    panel.panelType,
    panel.panelPayload
  );

  return state.update("panels", panels => panels.push(newPanel));
}

function deleteGoldenLayoutChild(state, panelId) {
  return state.update("panels", panels => panels.filter(p => p.id !== panelId));
}
//TODO END

function loadPanels(state, loadedState) {
  //return default state when there is no saved states
  if (loadedState == null) {
    return state.merge({ isEmptyDb: true });
  }
  //else, update current panels and merge it with saved config value
  const statesArray = Object.values(loadedState); //array of states
  const lastState = statesArray.pop();
  const loadedPanels = lastState.panels;
  const loadedPanelsConfig = lastState.config;
  const updatedPanels = state.update("panels", panels => List(loadedPanels));

  return updatedPanels.merge({ config: loadedPanelsConfig, isEmptyDb: false });
}
//*** HELPER FUNCTIONS END */

function panels(state = Map({ panels: List([]) }), action) {
  switch (action.type) {
    case actionType.LOAD_PANELS_SUCCESS:
      return loadPanels(state, action.payload);
    case "ADD_NEW_PANEL":
      return addGoldenLayoutChild(state, action.panel);
    case "DELETE_PANEL":
      return deleteGoldenLayoutChild(state, action.panelId);
  }
  return state;
}

export default panels;
