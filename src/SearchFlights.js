import React, { Component } from "react";
import axios from "axios";
import FlightAdminResultDiv from "./AdminPage/Components/flightAdminResultDiv";
import { Table } from "react-bootstrap";
class SearchFlights extends Component {
  constructor(props) {
    super(props);
    //console.log("constructor")
    this.state = {
      flightList: [],
      airlineName: [],
      countryList: [],
      index1: 0,
      updagteList: [],
      boolArray: false,
      boolId: false,
      element: [],
      idElement: "",
     
    };
  }

  componentDidMount() {
    //console.log("componentDidMount");
    //geting data for all flights
    axios
      .get("http://localhost:52832/api/anonymous/getallflights")
      .then((Response) => {
        this.setState({ flightList: Response.data });
      })
      .then(() => {
        //geting data for airpline name and setind data
        axios
          .get("http://localhost:52832/api/anonymous/getnamesofairplanes")
          .then((Response) => {
            this.setState({ airlineName: Response.data });
           
            // maching airline name to flightList array for display
            for (let i = 0; i < this.state.airlineName.length; i++) {
              // const { flight } = this.state;
              let airline = this.state.airlineName[i]._AirLine_Name;
              this.setState((prev) => ({
                flightList: prev.flightList.map((flight) =>
                  flight._AirlineCompany_Id === this.state.airlineName[i]._Id
                    ? { ...flight, _AirlineCompany_Id: airline }
                    : flight
                ),
              }));
            }
          });
      })
      .then(() => {
        // geting country name and seting data
        axios
          .get("http://localhost:52832/api/anonymous/getallcountries")
          .then((Response) => {
            this.setState({ countryList: Response.data });
            // maching countries to origin countries
            for (let i = 0; i < this.state.countryList.length; i++) {
            
              let country = this.state.countryList[i]._Country_Name;
              this.setState((prev) => ({
                flightList: prev.flightList.map((flight) =>
                  flight._Origen_Cuntry_code === this.state.countryList[i]._Id
                    ? { ...flight, _Origen_Cuntry_code: country }
                    : flight
                ),
              }));
            }
            for (let i = 0; i < this.state.countryList.length; i++) {
             // maching countries to destination countries
              let country = this.state.countryList[i]._Country_Name;
              this.setState((prev) => ({
                flightList: prev.flightList.map((flight) =>
                  flight._Destination_Contrey_Code ===
                  this.state.countryList[i]._Id
                    ? { ...flight, _Destination_Contrey_Code: country }
                    : flight
                ),
              }));
            }
          });
        //console.log(this.state.flightList[0]._Id);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  //checking for flight by parameters
  handleChange = (e) => {
    //values
    const targetName = e.target.name;
    const targetValue = e.target.value;
    console.log(targetName);
    console.log(targetValue);
    console.log(this.state.flightList);
    //seting to false
    this.setState({ boolArray: false }, () => {
      this.setState({ boolId: false }, () => {
        //switch case for  select items  and enable display
        switch (targetName) {
          //for id
          case "id":
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (parseInt(targetValue) === this.state.flightList[j]._Id) {
                this.setState({ idElement: "" }, () => {
                  this.setState(
                    {
                      idElement: (
                        <FlightAdminResultDiv
                          details={this.state.flightList}
                          index={j}
                        />
                      ),
                    },
                    () => {
                      this.setState({ boolId: true });
                    }
                  );
                });
              }
            }
            break;
          //for airline name
          case "airline":
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (targetValue === this.state.flightList[j]._AirlineCompany_Id) {
                this.setState({ element: [] }, () => {
                  this.state.element.push(
                    <FlightAdminResultDiv
                      details={this.state.flightList}
                      index={j}
                    />
                  );
                  console.log(this.state.element);
                  this.setState({ boolArray: true });
                });
              }
            }

            break;
          //for origin country
          case "origin":
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (
                targetValue === this.state.flightList[j]._Origen_Cuntry_code
              ) {
                this.setState({ element: [] }, () => {
                  this.state.element.push(
                    <FlightAdminResultDiv
                      details={this.state.flightList}
                      index={j}
                    />
                  );
                  console.log(this.state.element);
                  this.setState({ boolArray: true });
                });
              }
            }
            break;
          // for destination country
          case "destination":
            console.log(targetValue )
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (
                targetValue  ===
                this.state.flightList[j]._Destination_Contrey_Code
              ) {
     
                this.setState({ element: [] }, () => {
                  this.state.element.push(
                    <FlightAdminResultDiv
                      details={this.state.flightList}
                      index={j}
                    />
                  );
                  console.log(this.state.element);
                  this.setState({ boolArray: true });
                });
              }
            }
            break;
          // for depature
          case "departure":
            console.log(targetValue )
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (targetValue +'T00:00:00' === this.state.flightList[j]._Departure_Time) {
            
                this.setState({ element: [] }, () => {
                  this.state.element.push(
                    <FlightAdminResultDiv
                      details={this.state.flightList}
                      index={j}
                    />
                  );
                  console.log(this.state.element);
                  this.setState({ boolArray: true });
                });
              }
            }
            break;
          // for landing
          case "landing":
            for (let j = 0; j < this.state.flightList.length; j++) {
              if (targetValue +'T00:00:00' === this.state.flightList[j]._Landing_Time) {
                this.setState({ element: [] }, () => {
                  this.state.element.push(
                    <FlightAdminResultDiv
                      details={this.state.flightList}
                      index={j}
                    />
                  );
                  console.log(this.state.element);
                  this.setState({ boolArray: true });
                });
              }
            }
            break;
          default:
        }
      });
    });
  };


  render() {
    const { flightList,airlineName  , countryList} = this.state;
  
    return (
      <div >
        <div id="selectDiv">
          <h3> Search for flights</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <select name="id" onChange={this.handleChange}>
                    <option>Flight Id</option>
                    {flightList.map((flight) => (
                      <option
                        key={flight._Id}
                        value={flight._Id}
                        id={flight._Id + "id"}
                      >
                        {flight._Id}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select name="airline" onChange={this.handleChange}>
                    <option>Airline Name</option>
                    {airlineName.map((air) => (
                      <option
                        key={air._Id}
                        value={air._AirLine_Name}
                      >
                        {air._AirLine_Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select name="origin" onChange={this.handleChange}>
                    <option>Origin</option>
                    {countryList.map((country) => (
                      <option
                        key={country._Id}
                        value={country._Country_Name}
                      >
                        {country._Country_Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select name="destination" onChange={this.handleChange}>
                    <option>Destination</option>
                    {countryList.map((country) => (
                      <option
                        key={country._Id}
                        value={country._Country_Name}
                      >
                        {country._Country_Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  Departure:
                  <input
                    onChange={this.handleChange}
                    type="date"
                    name="departure"
                    placeholder="Landing"
                  ></input>
                </td>
                <td>
                  Landig:
                  <input
                    onChange={this.handleChange}
                    type="date"
                    name="landing"
                    placeholder="Landing"
                  ></input>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div id="divResult"></div>
        <div>{this.state.boolArray && this.state.element}</div>
        <div>{this.state.boolId && this.state.idElement}</div>
      </div>
    );
  }
}
export default SearchFlights;
