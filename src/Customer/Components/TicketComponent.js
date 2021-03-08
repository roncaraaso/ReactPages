import React, { Component } from "react";
import{Table ,Button} from 'react-bootstrap'

export class TicketComponent extends Component {
  render() {
  // ticket component
    return (
      <div>
      
      <Table striped bordered hover>

        <thead>
          <tr>
            <td>first Name:{this.props.customerArray._First_Name}</td>
          <td>Departure Time:{this.props.flightArray[this.props.num]._Departure_Time}</td>
          <td>Destination country:{this.props.flightArray[this.props.num]._Destination_Contrey_Code}</td>
          <td>Fly with:{this.props.flightArray[this.props.num]._AirlineCompany_Id}</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>Last Name:{this.props.customerArray._Last_Name}</td>
          <td>Landing Time:{this.props.flightArray[this.props.num]._Landing_Time}</td>
          <td>Origin Country:{ this.props.flightArray[this.props.num]._Origen_Cuntry_code }</td>
          <td></td>   
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={()=> this.props.deleteTicket()}>Cancel Flight</Button>
      <hr/>
      </div>
    );
  }
}

export default TicketComponent;
