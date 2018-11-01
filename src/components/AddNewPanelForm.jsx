import React, { Component } from "react";
import { addNewPanel } from "../app_redux/actions/panelsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSection } from "../app_redux/actions/panelsActions";
class AddNewPanelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //dropdown panel types
      components: [
        { id: 1, value: "Form" },
        { id: 2, value: "Table" },
        { id: 3, value: "DecrementButton" },
        { id: 4, value: "ResetCountButton" }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { panels, count } = this.props;
    const newPanel = {
      panelTitle: this.panelTitle.value,
      panelType: this.panelType.value,
      panelPayload: this.panelPayload.value
    };
    // this.props.addNewPanel(panel);
    this.props.createSection(panels, newPanel, count);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        {/* PANEL TITLE */}
        <div className="input-group input-group-sm mb-3 m-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Title
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            required
            ref={input => (this.panelTitle = input)}
          />
        </div>
        {/* PANEL TITLE END */}
        {/* PANEL TYPE */}
        <div className="input-group input-group-sm mb-3 m-2">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Type
            </label>
          </div>
          <select
            className="custom-select custom-select-sm"
            id="inputGroupSelect01"
            defaultValue=""
            required
            ref={input => (this.panelType = input)}
          >
            <option value="" disabled>
              Choose panel type...
            </option>
            {this.state.components.map(component => (
              <option key={component.id} value={component.value}>
                {component.value}
              </option>
            ))}
          </select>
        </div>
        {/* PANEL TYPE END */}

        {/* PANEL PAYLOAD */}
        <div className="input-group input-group-sm mb-3 m-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Payload
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            required
            ref={input => (this.panelPayload = input)}
          />
        </div>
        {/* PANEL PAYLOAD END */}

        {/* ADD NEW PANEL BUTTON */}
        <button type="submit" className="btn btn-sm btn-success mb-3 m-2">
          Create
        </button>
        {/* ADD NEW PANEL BUTTON END */}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    panels: state.panels.get("panels")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createSection: createSection
    },
    dispatch
  );
}

export default (AddNewPanelForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPanelForm));
