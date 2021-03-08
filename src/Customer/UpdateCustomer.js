import React, { Component } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

export class UpdateCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: [],
      test: "",
    };
  }

  componentDidMount() {
    const userName = sessionStorage.getItem("customerUserName");
    const password = sessionStorage.getItem("customerPassword");
    //geting loged in user details
    axios({
      method: "GET",
      url:
        "http://localhost:52832/api/customer/getcustomerbyuesrname/" + userName,
      headers: {
        Authorization: "Basic " + btoa(`${userName}:${password}`),
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({ userName: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update = () => {
    const userName = sessionStorage.getItem("customerUserName");
    const password = sessionStorage.getItem("customerPassword");
    //post to update details
    axios({
      method: "PUT",
      url: "http://localhost:52832/api/customer/updateonecustomer",
      data: {
        _Id: this.state.userName._Id,
        _First_Name: document.getElementById("firstNameW").value,
        _Last_Name: document.getElementById("lastNameW").value,
        _User_Name: document.getElementById("userNameW").value,
        _Password: document.getElementById("passwordW").value,
        _Address: document.getElementById("addressW").value,
        _Phone_No: document.getElementById("phoneW").value,
        _Credit_Card_Number: document.getElementById("creditW").value,
        _Email: document.getElementById("emailW").value,
      },
      headers: {
        Authorization: "Basic " + btoa(`${userName}:${password}`),
      },
    }).then((res) => {
      console.log(document.getElementById("userNameW").value);
    });
  };

  render() {
    const { userName } = this.state;
    return (
      <div className="mainDiv">
        <div>Update Details</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>User Name</td>
              <td>Password</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  id="firstNameW"
                  defaultValue={userName._First_Name}
                  placeholder={userName._First_Name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="lastNameW"
                  defaultValue={userName._Last_Name}
                  placeholder={userName._Last_Name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="userNameW"
                  defaultValue={userName._User_Name}
                  placeholder={userName._User_Name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="passwordW"
                  defaultValue={userName._Password}
                  placeholder={userName._Password}
                ></input>
              </td>
            </tr>
            <tr>
              {" "}
              <td>address</td>
              <td>Phone Number</td>
              <td>Email</td>
              <td>Credit Card</td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="addressW"
                  defaultValue={userName._Address}
                  placeholder={userName._Address}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="phoneW"
                  defaultValue={userName._Phone_No}
                  placeholder={userName._Phone_No}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="emailW"
                  defaultValue={userName._Email}
                  placeholder={userName._Email}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id="creditW"
                  defaultValue={userName._Credit_Card_Number}
                  placeholder={userName._Credit_Card_Number}
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button variant="warning" onClick={this.update}>
          Update
        </Button>
      </div>
    );
  }
}

export default UpdateCustomer;
