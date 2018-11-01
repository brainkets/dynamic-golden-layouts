import React, { Component } from "react";
import { resetCount } from "../app_redux/actions/countActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IncrementButtonContainer } from "./IncrementButton";

class ResetCountButton extends Component {
  render() {
    return (
      <div>
        <IncrementButtonContainer />
        <button
          className="btn btn-sm btn-danger m-2"
          onClick={() => this.props.resetCount()}
        >
          Reset Count
        </button>

        <label className="text-info">Payload: {this.props.payload}</label>
      </div>
    );
  }
}

ResetCountButton.propTypes = {
  resetCount: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    resetCount: () => dispatch(resetCount())
  };
}

export const ResetCountButtonContainer = connect(
  null,
  mapDispatchToProps
)(ResetCountButton);
