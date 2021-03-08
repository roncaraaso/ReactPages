import React, { Component } from "react";
import AddFlightComponent from "./Components/AddFlightComponent";
import axios from "axios";
import { Table } from "react-bootstrap";
export class AddFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineCompany: "",
      origenCountry: "",
      destination: "",
      departue: "",
      landing: "",
      tickets: "",
      countriesArray: [],
      airlineArray: [],
    };
  }
  componentDidMount() {
    //geting all countris for display
    axios
      .get("http://localhost:52832/api/anonymous/getallcountries")
      .then((res) => {
        this.setState({ countriesArray: res.data });
        // console.log(this.state.countriesArray);
      })
      .catch((err) => {
        console.log(err);
      });
     // geting all airline for display
    axios
      .get("http://localhost:52832/api/anonymous/getnamesofairplanes")
      .then((res) => {
        this.setState({ airlineArray: res.data });
        console.log(this.state.airlineArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  createFlight = () => {
    const {airlineCompany ,destination ,origenCountry,departue,landing ,tickets}= this.state
    const userName = sessionStorage.getItem("airlineUserName");
    const password = sessionStorage.getItem("airlinePassword");
  
// posting a flight
   if(airlineCompany ||destination ||origenCountry||departue ||landing ||tickets !== undefined ||null){
    axios({
      method: "POST",
      url: "http://localhost:52832/api/company/createflight",
      data: {
        _AirlineCompany_Id: airlineCompany,
        _Destination_Contrey_Code: destination,
        _Origen_Cuntry_code: origenCountry,
        _Departure_Time: departue,
        _Landing_Time: landing,
        _Remaining_Tikes: tickets,
      },
      headers: {
        Authorization: "Basic " + btoa(`${userName}:${password}`),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
   }

  };
// taking data from component  and seting state for updateing leater
  go = (name) => {
    switch (name) {
      case "airlineCompany":
        this.setState({ airlineCompany: document.getElementById(name).value });
        break;
      case "origenCountry":
        this.setState({ origenCountry: document.getElementById(name).value });
        break;
      case "destination":
        this.setState({ destination: document.getElementById(name).value });
        break;
      case "departue":
        this.setState({ departue: document.getElementById(name).value });
        break;
      case "landing":
        this.setState({ landing: document.getElementById(name).value });
        break;
      case "tickets":
        this.setState({ tickets: document.getElementById(name).value });
        break;
      default:
    }
  };
  render() {
    console.log(this.props.history)
    return (
      <div >
        <AddFlightComponent input={this.go} createFlight={this.createFlight} />
       <div className=' floatRight' >
        <Table striped bordered hover>
          <thead >
            <tr >
              <td >Id Of Country</td>
              <td >Name Of Country</td>
       
            </tr>
          </thead>
          <tbody>
            {
              this.state.countriesArray.map((country) =>(
                <tr key={country._Id}>
                <td >{country._Id}</td>
                <td >{country._Country_Name}</td>
                </tr>
             ))}
          </tbody>
        </Table>
     
        <Table striped bordered hover >
        <thead>
          <tr>
            <td>Id Of Airline</td>
            <td>Name Of Airline</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.airlineArray.map((air) =>(
              <tr key={air._Id}>
              <td>{air._Id}</td>
              <td>{air._AirLine_Name}</td>
              </tr>
           ))}
        </tbody>
      </Table>
      </div>
      </div>
    );
  }
}

export default AddFlight;
/*<td>{air._Id}</td>
<td>{air._AirLine_Name}</td>*/