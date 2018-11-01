export default (id, panelTitle, panelType, panelPayload) => ({
  id: id,
  title: panelTitle,
  type: "react-component",
  component: panelType,
  componentState: { text: panelPayload },
  props: { id: id, payload: panelPayload }
});
