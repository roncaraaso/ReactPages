import React, { Component } from "react";
import axios from "axios";
import { Table, Badge } from "react-bootstrap";

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flihgtArray: [],
      countryArray: [],
   
    };
  }
  componentDidMount() {
  

    axios("http://localhost:52832/api/anonymous/getallflights")
      .then((res) => {
        this.setState({ flihgtArray: res.data });


            axios("http://localhost:52832/api/anonymous/getallcountries")
              .then((res2) => {
                this.setState(
                  { countryArray: res2.data }
                );
    
                console.log(this.state.countryArray.length);
                for (let i = 0; i <this.state.countryArray.length; i++) {
                    let country = this.state.countryArray[i]._Country_Name;
                    
                    this.setState((prev) => ({
                      flihgtArray: prev.flihgtArray.map((flight) =>
                        flight._Origen_Cuntry_code === this.state.countryArray[i]._Id
                          ? { ...flight, _Origen_Cuntry_code: country }
                          : flight
                      ),
                    }));
                  }
                  for (let i = 0; i < this.state.countryArray.length; i++) {
                    let country = this.state.countryArray[i]._Country_Name;
                    this.setState((prev) => ({
                      flihgtArray: prev.flihgtArray.map((flight) =>
                        flight._Destination_Contrey_Code === this.state.countryArray[i]._Id
                          ? { ...flight, _Destination_Contrey_Code: country }
                          : flight
                      ),
                    }));
                  }
              })
              .catch((err) => {
                console.log(err);
              });
      
      })
      .catch((err) => {
        console.log(err);
      });
  }
  RendomNum = () => {
    let num = Math.floor(Math.random() * 11);
    return num;
  };
  RendomStatus = function (num) {
    const landing = "Landing";
    const landed = " Landed";
    const notFinal = "Not Final";
    if (num >= 6) return <Badge variant="success"> {landing} </Badge>;
    else if (num >= 0 && num <= 4)
      return <Badge variant="primary"> {landed} </Badge>;
    else if (num == 5) return <Badge variant="warning"> {notFinal} </Badge>;
  };


  render() {
    const { flihgtArray } = this.state;
 
    return (
      <div>
        <Table id="LandingTable" striped bordered hover>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Departing From</th>
              <th>Destination</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {flihgtArray.map((flight, index) => (
              <tr key={index}>
                <td>{flight._AirlineCompany_Id}</td>
                <td>{flight._Origen_Cuntry_code}</td>
                <td>{flight._Destination_Contrey_Code}</td>
                <td>{flight._Landing_Time}</td>
                <td>{this.RendomStatus(this.RendomNum())}</td>
        
              </tr>
            ))}
          </tbody>
          
        </Table>
      </div>
    );
  }
}

export default Landing;
