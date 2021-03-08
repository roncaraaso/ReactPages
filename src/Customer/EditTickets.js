import axios from "axios";
import React, { Component } from "react";
import TicketComponent from "./Components/TicketComponent";

export class EditTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketArray: [],
      flightArray: [],
      customerArray: [],
      countryArray: [],
      airlineArray: [],
      originFlightArray:[]
    };
  }

  componentDidMount() {
    const userName = sessionStorage.getItem("customerUserName");
    const password = sessionStorage.getItem("customerPassword");
 
    // get all flights
    axios({
      method: "GET",
      url: "http://localhost:52832/api/customer/getallmyflights",
      headers: {
        Authorization: "Basic " + btoa(`${userName}:${password}`),
      },
    })
      .then((res) => {
        this.setState({ originFlightArray: res.data });
        this.setState({ flightArray: res.data });
 
        //get all countries for display
        axios({
          method: "GET",
          url: "http://localhost:52832/api/anonymous/getallcountries",
        })
          .then((res) => {
            this.setState({ countryArray: res.data });
        //looping to set countries names
            for (let i = 0; i < this.state.countryArray.length; i++) {
              let country = this.state.countryArray[i]._Country_Name;
              this.setState((prev) => ({
                flightArray: prev.flightArray.map((flight) =>
                  flight._Origen_Cuntry_code === this.state.countryArray[i]._Id
                    ? { ...flight, _Origen_Cuntry_code: country }
                    : flight
                ),
              }));
            }
            //looping to set countries names
            for (let i = 0; i < this.state.countryArray.length; i++) {
                let country = this.state.countryArray[i]._Country_Name;
                this.setState((prev) => ({
                  flightArray: prev.flightArray.map((flight) =>
                    flight._Destination_Contrey_Code === this.state.countryArray[i]._Id
                      ? { ...flight, _Destination_Contrey_Code: country }
                      : flight
                  ),
                }));
              }
            //get username
            axios({
              method: "GET",
              url:
                "http://localhost:52832/api/customer/getcustomerbyuesrname/" +
                userName,
              headers: {
                Authorization: "Basic " + btoa(`${userName}:${password}`),
              },
            })
              .then((res) => {
                this.setState({ customerArray: res.data });
                console.log(res.data);
//looping to set user name
                for (let i = 0; i < this.state.airlineArray.length; i++) {
                  let name = this.state.airlineArray[i]._AirLine_Name;
                  this.setState((prev) => ({
                    flightArray: prev.flightArray.map((flight) =>
                      flight._AirlineCompany_Id ===
                      this.state.airlineArray[i]._Id
                        ? { ...flight, _AirlineCompany_Id: name }
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
      })
      .catch((err) => {
        console.log(err);
      });

    //get all tickets
    axios({
      method: "GET",
      url: "http://localhost:52832/api/customer/getalltickets",
      headers: {
        Authorization: "Basic " + btoa(`${userName}:${password}`),
      },
    })
      .then((res) => {
        this.setState({ ticketArray: res.data });
       // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //get all airline name for display
    axios({
      method: "GET",
      url: "http://localhost:52832/api/anonymous/getnamesofairplanes",
    })
      .then((res) => {
        this.setState({ airlineArray: res.data });
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteTicket =(id )=>{
    const userName = sessionStorage.getItem("customerUserName");
    const password = sessionStorage.getItem("customerPassword");
//deleting ticket from server
 axios({
     method:"DELETE",
     url:"http://localhost:52832/api/customer/cancelticket",
     data:{
        _Id:id 
     },
     headers:{
        Authorization: "Basic " + btoa(`${userName}:${password}`), 
     }
 })   .then((res) => {
  console.log(res)
  })
  .catch((err) => {
    console.log(err);
  });
  }

  render() {
  //console.log(this.state.flightArray);
    return (
    
      <div className="mainDiv">
        {(this.state.flightArray.length && this.state.airlineArray.length) > 0 ? (
         this.state.flightArray.map((flight ,findex)=>(
             this.state.ticketArray.map((ticket,index)=>(
                 ticket._Custumer_Id ===this.state.customerArray._Id &&flight._Id ===ticket._Flight_Id ?  <TicketComponent key={index}
                 customerArray={this.state.customerArray}
                 flightArray={this.state.flightArray}
                 countryArray={this.state.countryArray}
                 airlineArray={this.state.airlineArray}
                 num={findex}
                 deleteTicket={()=>this.deleteTicket(ticket._Id)}
               /> 
                :null
             ))
         ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default EditTickets;
