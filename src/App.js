import React, { Component } from "react";
import "./App.css";
import { NavbarContainer } from "./components/Navbar";
import PropTypes from "prop-types";
import GoldenLayoutWrapper from "./components/GoldenLayoutWrapper";
import { css } from "react-emotion";
import { Provider } from "react-redux";
import { init as firebaseInit } from "./javascripts/firebase";
import { loadSections } from "../src/app_redux/actions/panelsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ClipLoader } from "react-spinners";

//loading spinner css
const override = css`
  display: block !important;
  margin: 0 auto;
  border-color: red;
`;

class App extends Component {
  constructor(props) {
    super(props);
    firebaseInit();
    this.state = {};
  }

  componentDidMount() {
    this.props.loadSections();
  }

  render() {
    return (
      <React.Fragment>
        <Provider store={this.context.store}>
          <NavbarContainer />
        </Provider>
        <main className="container-fluid">
          <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.props.isEmptyDb === undefined}
          />
          {this.displayGoldenLayoutWrapper()}
        </main>
      </React.Fragment>
    );
  }
  displayGoldenLayoutWrapper = () => {
    let result;
    if (this.props.isEmptyDb === true) {
      result = "Please create a new panel!";
    } else if (this.props.isEmptyDb === false) {
      result = <GoldenLayoutWrapper />;
    }

    return result;
  };
}

function mapStateToProps(state) {
  return {
    isEmptyDb: state.panels.get("isEmptyDb")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadSections: loadSections
    },
    dispatch
  );
}
// ContextTypes must be defined in order to pass the redux store to exist in
// "this.context". The redux store is given to App from its
// surrounding <Provider> in index.jsx.
App.contextTypes = {
  store: PropTypes.object.isRequired
};

export default (App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
