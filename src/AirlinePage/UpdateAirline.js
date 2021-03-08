import axios from "axios";
import React, { Component } from "react";
import {Button , Table} from 'react-bootstrap'
export class UpdateAirline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineArray: [{}],
    };
  }

  componentDidMount() {

    const userName = sessionStorage.getItem('airlineUserName')
    const password = sessionStorage.getItem('airlinePassword')
    axios
    // geting loged in airline for dislpau
      .get(
        "http://localhost:52832/api/company/getairlinebyusername/" + userName,

        {
          headers: {
            Authorization: "Basic " + btoa(`${userName}:${password}`),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log();
        this.setState({ airlineArray: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update = () => {
    const userName = sessionStorage.getItem('airlineUserName')
    const password = sessionStorage.getItem('airlinePassword')
    //updateing to server details 
    axios({
      method :'put',
      url:"http://localhost:52832/api/company/mofidyairlinedetails",
        headers:{
            Authorization: "Basic " + btoa(`${userName}:${password}`),
          },
          data:{
            _Id:this.state.airlineArray._Id,  
            _AirLine_Name: document.getElementById("airlineName").value,
            _Area_Code: document.getElementById("areaCode").value,
            _Country_Code: document.getElementById("countryCode").value,
            _Email: document.getElementById("email").value,
            _First_Name: document.getElementById("firstName").value,
            _Last_Name: document.getElementById("lastName").value,
            _Password: document.getElementById("password").value,
            _Phone_Number: document.getElementById("phoneNumber").value,
            _User_Name: document.getElementById("userName").value,
          },    
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { airlineArray } = this.state;

    return (
      <div className='mainDiv'>
        <Table striped bordered hover >
        <thead>
        <tr>
        <td>Firat name</td>
        <td>Last name</td>
      
        </tr>
        </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  required
                  id="firstName"
                  placeholder={airlineArray._First_Name}
                  defaultValue={airlineArray._First_Name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  required
                  placeholder={airlineArray._Last_Name}
                  defaultValue={airlineArray._Last_Name}
                ></input>
              </td>
              </tr>
              <tr><td>Airline name</td>
              <td>User name</td></tr>
              <tr>
              <td>
                <input
                  type="text"
                  id="airlineName"
                  required
                  placeholder={airlineArray._AirLine_Name}
                  defaultValue={airlineArray._AirLine_Name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="userName"
                  required
                  placeholder={airlineArray._User_Name}
                  defaultValue={airlineArray._User_Name}
                ></input>
              </td>
              </tr>
              <tr><td>Password</td>
              <td>Country Code</td></tr>
          
              <tr>
              <td>
                <input
                  type="text"
                  id="password"
                  required
                  placeholder={airlineArray._Password}
                  defaultValue={airlineArray._Password}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="countryCode"
                  required
                  placeholder={airlineArray._Country_Code}
                  defaultValue={airlineArray._Country_Code}
                ></input>
              </td>
              </tr>
              <tr>   <td>Email</td>
              <td>Phone number</td></tr>
              <tr>
              <td>
                <input
                  type="text"
                  id="email"
                  required
                  placeholder={airlineArray._Email}
                  defaultValue={airlineArray._Email}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="phoneNumber"
                  required
                  placeholder={airlineArray._Phone_Number}
                  defaultValue={airlineArray._Phone_Number}
                ></input>
              </td>
              </tr>
          </tbody>
        </Table>
        <div className='mainDiv'>Area code</div>
        <div className='mainDiv'><input 
        type="text"
        required
        id="areaCode"
        placeholder={airlineArray._Area_Code}
        defaultValue={airlineArray._Area_Code}
      ></input></div>
        <Button variant="primary" onClick={this.update}>Update</Button>
      </div>
    );
  }
}

export default UpdateAirline;
