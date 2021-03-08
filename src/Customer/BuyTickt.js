import React, { Component } from 'react'
import axios from "axios";
import{Button , Table} from 'react-bootstrap'

export class BuyTickt extends Component {
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

    componentDidMount(){
        const userName = sessionStorage.getItem("customerUserName");
        const password = sessionStorage.getItem("customerPassword");
        console.log(userName);
        console.log(password);
        // get all flights
        axios({
          method: "GET",
          url: "http://localhost:52832/api/customer/getallmyflights",
          headers: {
            Authorization: "Basic " + btoa(`${userName}:${password}`),
          },
        }).then((res) => {
            this.setState({ originFlightArray: res.data });
            this.setState({ flightArray: res.data });
            console.log(res.data);
            //get all countries for display
            axios({
              method: "GET",
              url: "http://localhost:52832/api/anonymous/getallcountries",
            })
              .then((res) => {
                this.setState({ countryArray: res.data });
                console.log(res.data);
                // looping to mach countries to flight array
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
                 // looping to mach countries to flight array
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
                  //geting  airline name for display
                  axios({
                    method: "GET",
                    url: "http://localhost:52832/api/anonymous/getnamesofairplanes",
                  })
                    .then((res) => {
                      this.setState({ airlineArray: res.data });
                      console.log(res.data);
                       // looping to mach airLine name to flight array 
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
                      console.log(this.state.flightArray);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          // get all customers for geeing id for buying tickets
          axios({
            method: "GET",
            url: "http://localhost:52832/api/anonymous/getallcustomersforsearchlist",
      
          }).then((res) => {
              this.setState({ customerArray : res.data });
  
              console.log(res.data);})
}

buyTicket=(id, index)=>{
    const userName = sessionStorage.getItem("customerUserName");
    const password = sessionStorage.getItem("customerPassword");

    const numOfTickets = this.state.flightArray[index]._Remaining_Tikes
    let customerId  = 0
    console.log(id)
     //find customer id for use in next func
    this.state.customerArray.map(cast =>(
      userName === cast._User_Name ? customerId = cast._Id:null
    ))
 
    // posting or buying tickt
    axios({
        method: "POST",
        url: "http://localhost:52832/api/customer/purchaseticket",
        data:{
          _Flight_Id:id,
            _Custumer_Id:customerId
        },
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
      }).catch((err) => {
        console.log(err);
      }).then((res) => {
        console.log(res);
      })
  //  updateing the number of flight left
      axios({
        method:"PUT",
        url: "http://localhost:52832/api/customer/updateticket",
        data:{
            _Id:id,
            _Remaining_Tikes: numOfTickets-1
            
        },
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
           crossdomain: true 
        },
      }).catch((err) => {
        console.log(err);
      }).then((res) => {
        console.log(res);
      })
    
}
    render() {
       // console.log(this.state.flightArray);
        return (
            <div className="mainDiv">
                {this.state.flightArray.map((flight,index)=>(
                 flight._Remaining_Tikes > 0 ? (
                 <div key={index}>
                 <h3>Flight Ticket</h3>
                    <Table striped bordered hover>
                    <thead>
                      <tr>
                      <td>Airline Company </td>
                      <td>Origin country</td>
                      <td>Destination country</td>
                      <td>Departure</td>
                      <td>Landing</td>
                      <td>Fly With</td>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>{flight._AirlineCompany_Id} </td>
                      <td>{flight._Origen_Cuntry_code}</td>
                      <td>{flight._Destination_Contrey_Code}</td>
                      <td>{flight._Departure_Time}</td>
                      <td>{flight._Landing_Time}</td>
                      <td>{flight._AirlineCompany_Id}</td>
                    </tr>
                    </tbody>
                  </Table>
                  <Button onClick={()=>this.buyTicket(flight._Id , index)}>Buy Ticket</Button>
                  <hr/>
                  </div>
                 ):null
                ))}
            </div>
        )
    }
}

export default BuyTickt
