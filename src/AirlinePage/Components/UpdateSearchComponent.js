import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

export class UpdateSearchComponent extends Component {
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <td> </td>
              <td></td>
              <td>
                <h3>Result</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Search Airline By Name </td>
              <td>
                <input type="text" id="searchAirline"></input>
              </td>
              <td>
                <label id="label">
                </label>
              </td>
            </tr>
            <tr>
              <td> Search Country By </td>
              <td>
                <input type="text" id="searchACountry"></input>
              </td>
              <td>
                <label id="labelA">
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  variant="primary"
                  onClick={this.props.handleClickfForCountry}
                >
                  search
                </Button>
              </td>
              <td>
                <Button variant="success" onClick={this.props.handleClickForAirline}>
                  search Airline
                </Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UpdateSearchComponent;
