import React, { Component } from "react";
import axios from "axios";
import EditFlightcomponent from "./Components/EditFlightcomponent";
import UpdateSearchComponent from "./Components/UpdateSearchComponent";


export class EditFlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightArray: [],
      countryArray: [],
      airlineName: [],

      countryBool: false,
    };
  }

  componentDidMount() {
    const userName = sessionStorage.getItem('airlineUserName')
    const password = sessionStorage.getItem('airlinePassword')
    axios
    //geting flight list for display
      .get("http://localhost:52832/api/company/getallflights", {
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
      })
      .then((res) => {
     //   console.log(res.data);
        this.setState({ flightArray: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
       //geting countries  for display
    axios
      .get("http://localhost:52832/api/anonymous/getallcountries")
      .then((res) => {
        //console.log(res.data);
        this.setState({ countryArray: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
       //geting airline for display
    axios
      .get("http://localhost:52832/api/anonymous/getnamesofairplanes")
      .then((res) => {
     console.log(res.data);
        this.setState({ airlineName: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update = ( checkBox, id) => {
    const userName = sessionStorage.getItem('airlineUserName')
    const password = sessionStorage.getItem('airlinePassword')
    //updating flight if checkbox is checked
   if (document.getElementById(checkBox).checked) {
      axios({
        method:"PUT", 
        url:"http://localhost:52832/api/company/updateflight",

        data: {
          _AirlineCompany_Id: document.getElementById('airlineCompanyA'+id).value , 
          _Departure_Time:document.getElementById('departueA'+id).value , 
          _Destination_Contrey_Code:document.getElementById('destinationA'+id).value ,
          _Id: id,
          _Origen_Cuntry_code:document.getElementById('origenCountryA'+id).value,
          _Remaining_Tikes: document.getElementById('ticketsA'+id).value, 
          _Landing_Time:document.getElementById('landingA'+id).value, 
        },
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
      });
    }
  };
  remove = (name, id) => {
    const userName = sessionStorage.getItem('airlineUserName')
    const password = sessionStorage.getItem('airlinePassword')
      //deleting flight if checkbox is checked
    if (document.getElementById(name).checked) {
      axios.delete("http://localhost:52832/api/company/cancelflight", {
        data: {
          _Id: id,
        },
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
      });
    }
  };

//searching by airline name , the airline number code
  handleClickForAirline = () => {
    const text = document.getElementById("searchAirline").value;
  
    this.state.airlineName.map(
      (air) =>/*console.log(air._AirLine_Name),*/
        text.toLowerCase() === air._User_Name.toLowerCase()
          ? (document.getElementById("label").innerHTML = air._Id)
          : null

    );
 
  };
  //searching by country name , the country number code
  handleClickfForCountry = () => {
    const text = document.getElementById("searchACountry").value;
    this.state.countryArray.map((country) => 
      text.toLowerCase() === country._Country_Name.toLowerCase()
        ? (document.getElementById("labelA").innerHTML = country._Id)
        : null
    );
  };

  render() {
    const userName = sessionStorage.getItem('airlineUserName')
 
     console.log(this.state.airlineName)
     let userId = 0
    //  const { flightArray } = this.state;
    return (
      <div >
        <div className='mainDiv'>
          <UpdateSearchComponent
          handleClickForAirline={this.handleClickForAirline}
            handleClickfForCountry={this.handleClickfForCountry}
          />
        </div>
        {
          
           this.state.airlineName.map((air, index) => (
            air._User_Name === userName ? userId = air._Id : null
          )),
          this.state.flightArray.map((flight, index) => (
            userId === flight._AirlineCompany_Id ? <EditFlightcomponent key={flight._Id}
          data={flight}
          update={this.update}
          remove={this.remove}
          countryArray={this.countryArray}
        />:null
        ))}
      </div>
    );
  }
}

export default EditFlights;
