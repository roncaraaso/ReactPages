import axios from "axios";
import React, { Component } from "react";
import { Link   ,withRouter} from "react-router-dom";
import LoginNavbar from "./LoginNavbar";
import { Button, Table ,Card} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminUserName: "",
    };
  }

  componentDidMount = () => {
    //geting admin password to list
    axios
      .get("http://localhost:52832/api/anonymous/getpasswordforadmin")
      .then((res) => {
        this.adminPassword = res.data;
        console.log(this.adminUserName);
      })
      .catch((err) => {
        console.log(err);
      });
    //geting user name admin to list
    axios
      .get("http://localhost:52832/api/anonymous/getusernameforadmin")
      .then((res) => {
        this.adminUserName = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //geting airline user name to list
    axios
      .get("http://localhost:52832/api/anonymous/getusernameforairline")
      .then((res) => {
        this.airlineUserName = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // geting airline password to list
    axios
      .get("http://localhost:52832/api/anonymous/getpasswordforairline")
      .then((res) => {
        this.airlinePassword = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // geting user name customer to list
    axios
      .get("http://localhost:52832/api/anonymous/getusernameforcustomer")
      .then((res) => {
        this.customerUserName = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // geting password cusrumer to list
    axios
      .get("http://localhost:52832/api/anonymous/getpasswordforcustomer")
      .then((res) => {
        this.customerPassword = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //checking for and seting session storage dy correct password
  signInPassword = () => {
    const password = document.getElementById("passwordId").value;
    this.adminPassword.map((pass) =>
      pass === password
        ? sessionStorage.setItem("adminPassword", password)
        : null
    );
    this.airlinePassword.map((pass) =>
      pass === password
        ? sessionStorage.setItem("airlinePassword", password)
        : null
    );
    this.customerPassword.map((pass) =>
      pass === password
        ? sessionStorage.setItem("customerPassword", password)
        : null
    );
  };
//checking for and seting session storage dy correct user name
  signInUserName = () => {
    const userName = document.getElementById("userNameId").value;
    console.log(document.getElementById("userNameId").value);
    //checking for admin user name and password  and setting to session storage

    this.adminUserName.map((user) =>
      user === userName
        ? sessionStorage.setItem("adminUserName", userName)
        : null
    );

    //checking for airline user name and password and setting to session storage
    this.airlineUserName.map((user) =>
      user === userName
        ? sessionStorage.setItem("airlineUserName", userName)
        : null
    );

    //checking for customer user name and password and setting to session storage
    this.customerUserName.map((user) =>
      user === userName
        ? sessionStorage.setItem("customerUserName", userName)
        : null
    );
  };

  render() {

    return (
      <div  >
        <LoginNavbar bg="primary" variant="dark" />
        <Card className="text-center mainDiv" >
        <Card.Header>Sign IN With</Card.Header>
        <Card.Body>
        <Table striped bordered hover>
        <thead>
          <tr>
            <td>Uesr Name:</td>
            <td>
              <input
                type="text"
                onChange={this.signInUserName}
                onBlur={() =>
                  this.setState({
                    adminUserName: sessionStorage.getItem("adminUserName"),
                  })
                }
                required
                id="userNameId"
              ></input>
            </td>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  onChange={this.signInPassword}
                  required
                  id="passwordId"
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
      
        </Card.Body>
        <Card.Footer className="text-muted">
        <Link
        to={
          sessionStorage.getItem("adminUserName") !== null ? (
            "/HomeAdmin"
          ) : sessionStorage.getItem("airlineUserName") !== null ? (
            "/MainAirline"
          ) : sessionStorage.getItem("customerUserName") !== null ? (
            "/MainCustomer"
          ) : (
            <div></div>
          )
        }
      >
      <Button variant="primary">Sign In</Button>
      </Link>
        </Card.Footer>
        </Card>
 
      </div>
    );
  }
}
export default withRouter( Login);
