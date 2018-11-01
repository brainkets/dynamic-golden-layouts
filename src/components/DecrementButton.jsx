import React, { Component } from "react";
import { decrementCount } from "../app_redux/actions/countActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IncrementButtonContainer } from "./IncrementButton";

class DecrementButton extends Component {
  render() {
    return (
      <div>
        <IncrementButtonContainer />
        <button
          className="btn btn-sm btn-warning m-2"
          onClick={() => this.props.decrementCount()}
        >
          Decrement Count
        </button>
        <label className="text-info">Payload: {this.props.payload}</label>
      </div>
    );
  }
}

DecrementButton.propTypes = {
  decrementCount: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    decrementCount: () => dispatch(decrementCount())
  };
}

export const DecrementButtonContainer = connect(
  null,
  mapDispatchToProps
)(DecrementButton);
