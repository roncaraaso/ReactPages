import React, { Component } from "react";
import axios from "axios";
import AirlineAdminHead from "./Components/AirlineAdminHead";
import { Button, Table, InputGroup } from "react-bootstrap";
class AirlineAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineArray: [],
    };
  }
  getData = () => {
    axios
      .get("http://localhost:52832/api/anonymous/getallairlinecompanies")
      .then((response) => {
        this.setState({ airlineArray: response.data });
        console.log(this.state.airlineArray);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getData();
  }

  hadleUpdate = () => {
    const userName = sessionStorage.getItem("adminUserName");
    const password = sessionStorage.getItem("adminPassword");
    // console.log(this.state.airlineArray[0]);
    for (let j = 0; j < this.state.airlineArray.length; j++) {
      if (document.getElementById("checkBox" + j).checked) {
        console.log(document.getElementById("id" + j).value);
        axios({
          method: "PUT",
          url: "http://localhost:52832/api/administrator/updateairlinedetails",

          headers: {
            Authorization: "Basic " + btoa(`${userName}:${password}`),
          },
          data: {
            _Id: document.getElementById("id" + j).value,
            _AirLine_Name: document.getElementById("airlineName" + j).value,
            _Area_Code: document.getElementById("areaCode" + j).value,
            _Country_Code: document.getElementById("countryCode" + j).value,
            _Email: document.getElementById("email" + j).value,
            _First_Name: document.getElementById("firstName" + j).value,
            _Last_Name: document.getElementById("lastName" + j).value,
            _Password: document.getElementById("password" + j).value,
            _Phone_Number: document.getElementById("phoneNumber" + j).value,
            _User_Name: document.getElementById("userName" + j).value,
          },
        })
          .then((res) => {
            console.log(res);
          })
          .then(() => {
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  handleDelete = () => {
    const userName = sessionStorage.getItem("adminUserName");
    const password = sessionStorage.getItem("adminPassword");
    for (let j = 0; j < this.state.airlineArray.length; j++) {
      if (document.getElementById("checkBox" + j).checked) {
        console.log(document.getElementById("id" + j).value);
        axios
          .delete("http://localhost:52832/api/administrator/removeairline", {
            headers: {
              Authorization: "Basic " + btoa(`${userName}:${password}`),
            },
            data: {
              _Id: document.getElementById("id" + j).value,
            },
          })
          .then((res) => {
            console.log(res);
            console.log("customer deleted");
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  render() {
    const { airlineArray } = this.state;
    return (
      <div className='width'>
        <Table striped bordered hover>
          <AirlineAdminHead></AirlineAdminHead>
          <tbody>
            {airlineArray.map((airline, index) => (
              <tr key={airline._Id}>
                <td>
                  <input
                    size="sm"
                    className="mb-3"
                    type="checkbox"
                    id={"checkBox" + index}
                    value="true"
                  ></input>
                </td>
                <td>
                      <input
                        id={"airlineName" + index}
                        type="text"
                        defaultValue={airline._AirLine_Name}
                        placeholder={airline._AirLine_Name}
                      ></input>
                </td>
                <td>
                  <label>{airline._Id}</label>
                </td>
                <td>   
                  <input
                    id={"userName" + index}
                    type="text"
                    placeholder={airline._User_Name}
                    defaultValue={airline._User_Name}
                  ></input>    
                </td>
                <td>   
                  <input
                    id={"password" + index}
                    type="password"
                    placeholder={airline._Password}
                    defaultValue={airline._Password}
                  ></input>    
                </td>
                <td>  
                  <input
                    id={"countryCode" + index}
                    type="text"
                    placeholder={airline._Country_Code}
                    defaultValue={airline._Country_Code}
                  ></input>      
                </td>
                <td>   
                  <input
                    id={"firstName" + index}
                    type="text"
                    placeholder={airline._First_Name}
                    defaultValue={airline._First_Name}
                  ></input>     
                </td>
              
                <td>
                  <input
                    id={"lastName" + index}
                    type="text"
                    placeholder={airline._Last_Name}
                    defaultValue={airline._Last_Name}
                  ></input>       
                </td>
                <td>   
                  <input
                    id={"email" + index}
                    type="text"
                    placeholder={airline._Email}
                    defaultValue={airline._Email}
                  ></input>     
                </td>
                <td>  
                  <input
                    id={"phoneNumber" + index}
                    type="text"
                    placeholder={airline._Phone_Number}
                    defaultValue={airline._Phone_Number}
                  ></input>     
                </td>
                <td>   
                  <input
                    id={"areaCode" + index}
                    type="text"
                    placeholder={airline._Area_Code}
                    defaultValue={airline._Area_Code}
                  ></input>     
                </td>
                <td> 
                  <input
                    id={"id" + index}
                    type="hidden"
                    readOnly
                    value={airline._Id}
                    placeholder={airline._Area_Code}
                    //defaultValue={airline._Id}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button variant="primary" onClick={this.handleDelete}>
            Remove Airline
          </Button>
          <Button variant="warning" onClick={this.hadleUpdate}>
            Update Airline
          </Button>
        </div>
      </div>
    );
  }
}
export default AirlineAdmin;
