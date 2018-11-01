import React, { Component } from "react";
import { IncrementButtonContainer } from "./IncrementButton";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Payload: " + this.props.payload };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Nothing..");
  }
  render() {
    return (
      <div>
        <header>
          <IncrementButtonContainer />
        </header>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          {/* TITLE */}
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
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          {/*  TITLE END */}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn btn-sm btn-success mb-3 m-2">
            Save ( I do nothing.. )
          </button>
          {/* SUBMIT BUTTON END */}
        </form>
      </div>
    );
  }
}

export default Form;
