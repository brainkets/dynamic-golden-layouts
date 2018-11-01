import React, { Component } from "react";
import { incrementCount, resetCount } from "../app_redux/actions/countActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class IncrementButton extends Component {
  render() {
    return (
      <button
        className="btn btn-sm btn-primary m-2 float-right"
        onClick={() => this.props.incrementCount()}
      >
        Increment Count
      </button>
    );
  }
}

IncrementButton.propTypes = {
  incrementCount: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => dispatch(incrementCount()),
    resetCount: () => dispatch(resetCount())
  };
}

export const IncrementButtonContainer = connect(
  null,
  mapDispatchToProps
)(IncrementButton);
