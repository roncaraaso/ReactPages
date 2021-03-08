import React from "react";
import {  Table } from "react-bootstrap";
function FlightAdminResultDiv(flihgtList ) {
  const {details,index } = flihgtList;
    //console.log(j)
   console.log(details[index])
    console.log(index)
  return (
    <div className='mainDiv' key={details[index]._Id}>
      <div >
        Company :{details[index]._AirlineCompany_Id}
      </div>
      <div>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Departure : {details[index]._Departure_Time}</td>
              <td>Landing: {details[index]._Landing_Time}</td>
            </tr>
            <tr>
              <td>From :{details[index]._Origen_Cuntry_code}</td>
              <td>To:{details[index]._Destination_Contrey_Code}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr/>
    </div>
  );
}

export default FlightAdminResultDiv;
//<label>{flihgtList.dstails[flihgtList.index]._Departure_Time}</label>