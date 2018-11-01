import React, { Component } from "react";
import GoldenLayout from "golden-layout";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "./Table";
import { ResetCountButtonContainer } from "./ResetCountButton";
import Form from "./Form";
import { DecrementButtonContainer } from "./DecrementButton";
import { updateConfigValue } from "../app_redux/actions/panelsActions";

let goldenlayout;
class GoldenLayoutWrapper extends Component {
  componentDidMount() {
    //golden-layout config
    const config = {
      dimensions: {
        borderWidth: 5,
        minItemHeight: 200,
        minItemWidth: 200
      },
      content: [
        {
          type: "column",
          content: this.props.panels.toArray()
        }
      ]
    };

    function wrapComponent(Component, store) {
      class Wrapped extends React.Component {
        render() {
          return (
            <Provider store={store}>
              <Component {...this.props} />
            </Provider>
          );
        }
      }
      return Wrapped;
    }

    const { savedState } = this.props;
    if (savedState) {
      goldenlayout = new GoldenLayout(JSON.parse(savedState), this.layout);
    } else {
      goldenlayout = new GoldenLayout(config, this.layout);
    }

    goldenlayout.registerComponent(
      "ResetCountButton",
      wrapComponent(ResetCountButtonContainer, this.context.store)
    );
    goldenlayout.registerComponent(
      "DecrementButton",
      wrapComponent(DecrementButtonContainer, this.context.store)
    );
    goldenlayout.registerComponent(
      "Form",
      wrapComponent(Form, this.context.store)
    );

    goldenlayout.registerComponent(
      "Table",
      wrapComponent(Table, this.context.store)
    );
    setTimeout(() => {
      goldenlayout.init();
    });

    //save config when layouts state change
    goldenlayout.on("stateChanged", function() {
      let state = JSON.stringify(goldenlayout.toConfig());
      updateConfigValue(state);
    });
  }

  handleSaveConfig = () => {
    console.log("save config buutton");
    const state = JSON.stringify(goldenlayout.toConfig());
    console.log("stateChanged", state);
    updateConfigValue(state);
  };

  panelExist = panel => {
    const items = goldenlayout.root.contentItems[0];
    const itemExist = items.getItemsById(panel.id);
    if (itemExist.length > 0) {
      return true;
    }
    return false;
  };
  buildPanels = () => {
    if (this.props.savedState) {
      return;
    }
    this.props.panels.map(panel => {
      //setTimeout
      setTimeout(() => {
        // console.log("contentItems[0]", goldenlayout.root.contentItems[0]);
        if (goldenlayout.root.contentItems.length === 0) {
          goldenlayout.root.addChild(panel);
        } else {
          if (this.panelExist(panel)) {
            return;
          }
          goldenlayout.root.contentItems[0].addChild(panel);
        }
      }, 100);
    });
  };
  render() {
    return (
      <div>
        {/* <button
          className="btn btn-sm btn-primary m-2"
          onClick={() => this.handleSaveConfig()}
        >
          Save Panels Config
        </button> */}
        <div className="goldenLayout" ref={input => (this.layout = input)} />
        {this.buildPanels()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    panels: state.panels.get("panels"),
    savedState: state.panels.get("config")
  };
}

GoldenLayoutWrapper.contextTypes = {
  store: PropTypes.object.isRequired
};

export default (GoldenLayoutWrapper = connect(
  mapStateToProps,
  null
)(GoldenLayoutWrapper));
