import React, { Component } from "react";
import {Button , Table} from 'react-bootstrap'

export class EditFlightcomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightArray: [],  
      airlineCompany: "airlineCompanyA",
      origenCountry: "origenCountryA",
      destination: "destinationA",
      departue: "departueA",
      landing: "landingA",
      tickets: "ticketsA",
      checkbox:"checkboxA"
    };
  }


  
  render() {
//console.log(this.props.data._AirlineCompany_Id)
    return (
      <div>
        <Table>
          <thead striped bordered hover>
            <tr>
            <td></td>
              <td>Airline company</td>
              <td>Origin country</td>
              <td>Destination</td>
              <td>Departue </td>
              <td>landing</td>
              <td>Tickets Code</td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
            <input  type="checkbox" 
            id={"checkboxA"+this.props.data._Id} 
      
           value="true"
            ></input>
            </td>
              <td>
                <input
              
                  type="number"
                  required
                  id={"airlineCompanyA" +this.props.data._Id}
                  placeholder={this.props.data._AirlineCompany_Id}
                  defaultValue={this.props.data._AirlineCompany_Id}
                ></input>

              </td>
              <td>
                <input
               
                  type="number"
                  id={"origenCountryA" +this.props.data._Id}
                  required
                  placeholder={this.props.data._Origen_Cuntry_code}
                  defaultValue={this.props.data._Origen_Cuntry_code}
                ></input>
              </td>
              <td>
                <input
                
                  type="number"
                  id={"destinationA" +this.props.data._Id}
                  required
                  placeholder={this.props.data._Destination_Contrey_Code}
                  defaultValue={this.props.data._Destination_Contrey_Code}
                  ></input>
              </td>
              <td>
                <input
               
                  type="date"
                  id={"departueA" + this.props.data._Id}
                  required
                  placeholder={this.props.data._Departure_Time}
                  defaultValue={this.props.data._Departure_Time}
                  ></input>
              </td>
              <td>
                <input

                  type="date"
                  id={"landingA" +this.props.data._Id}
                  required
                  placeholder={this.props.data._Landing_Time}
                  defaultValue={this.props.data._Landing_Time}
                  ></input>
              </td>
              <td>
                <input
       
                  type="number"
                  id={"ticketsA" +this.props.data._Id}
                  required
                  placeholder={this.props.data._Remaining_Tikes}
                  defaultValue={this.props.data._Remaining_Tikes}
                  ></input>
              </td>
            </tr>
            <tr>
            <td></td>
              <td>
                <Button onClick={()=> this.props.update(this.state.checkbox +this.props.data._Id,this.props.data._Id)}>Update</Button>
                <Button onClick={()=> this.props.remove(this.state.checkbox +this.props.data._Id,this.props.data._Id)}>Remove</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EditFlightcomponent;
