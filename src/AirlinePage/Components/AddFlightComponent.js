import React, { Component } from "react";
import {Button , Table} from 'react-bootstrap'

export class AddFlightComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineCompany: "airlineCompany",
      origenCountry: "origenCountry",
      destination: "destination",
      departue: "departue",
      landing: "landing",
      tickets: "tickets",
    };
  }


  render() {

    return (
      <div>
        <div>
          <h1>Add new flight</h1>
        </div>
        <div>
        <form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Airline company</td>
                <td>Origen counrty</td>
                <td>Destination country</td>
                <td>Departue</td>
                <td>Landig</td>
                <td>Remaining tickets</td>
              </tr>
            </thead>
            <tbody>
            
              <tr>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.airlineCompany);
                    }}
                    type="number"
                   id="airlineCompany"
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.origenCountry);
                    }}
                    type="number"
                    id="origenCountry"
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.destination);
                    }}
                    type="number"
                    id="destination"
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.departue);
                    }}
                    type="date"
                    id="departue"
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.landing);
                    }}
                    type="date"
                    id="landing"
                    required
                  />
                </td>
                <td>
                  <input
                    onChange={() => {
                      this.props.input(this.state.tickets);
                    }}
                    type="number"
                    id="tickets"
                    required
                  />
                </td>
              </tr>
            
              <tr><td> <Button onClick={this.props.createFlight}>Create flight</Button></td></tr>
            </tbody>
           
          </Table>
          </form>
        </div>
      </div>
    );
  }
}

export default AddFlightComponent;
