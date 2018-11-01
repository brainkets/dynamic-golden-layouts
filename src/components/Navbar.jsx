import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCountValue } from "../app_redux/actions/countActions";

import AddNewPanelForm from "./AddNewPanelForm";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {
    const { count, updateCountValue } = this.props;
    if (prevProps.count !== count) {
      //firebase update
      updateCountValue(count);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Count Value
          <span className="badge badge-pill badge-secondary m-2">
            {this.props.count}
          </span>
        </a>
        {/* ADD NEW PANEL FORM */}
        <AddNewPanelForm {...this.props} />
      </nav>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateCountValue: newValue => dispatch(updateCountValue(newValue))
  };
}
function mapStateToProps(state) {
  return {
    count: state.count.get("count")
  };
}

export const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
