import React, { Component } from "react";
import { IncrementButtonContainer } from "./IncrementButton";

export class Table extends Component {
  render() {
    return (
      <div>
        <IncrementButtonContainer />

        <table className="table" style={{ color: "white" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <label className="text-info">
                  Payload: {this.props.payload}
                </label>
              </td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
