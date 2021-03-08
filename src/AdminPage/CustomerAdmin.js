import React, { Component } from "react";
import axios from "axios";
import CustomerAdminFirstLine from "./Components/CustumerAdminHeadesFL";
import CustomerAdminSecondLine from "./Components/CustomerAdminSL";
import {imgArray} from './UserPictures/img'
import { Button, Table } from "react-bootstrap";

export class CustomerAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listcustomers: [],
    };
  }
// geting data for display
  getData = () => {
    axios
    .get("http://localhost:52832/api/anonymous/getallcustomersforsearchlist")
    .then((responce) => {
      // console.log(responce.data);
      this.setState({ listcustomers: responce.data });
        console.log(this.state.listcustomers);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  componentDidMount() {
    this.getData()
  //  console.log(this.getData)

  }
  // updating customer
  updateCustumer = (index, id) => {
    const userName = sessionStorage.getItem('adminUserName')
    const password = sessionStorage.getItem('adminPassword')
    axios({
        method:'PUT',
        url:"http://localhost:52832/api/administrator/updatecustomerdetails",
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
        data: {
          _Id:document.getElementById(index + "id").value,
          _Address: document.getElementById(index + "address").value,
          _Credit_Card_Number: document.getElementById(index + "creditCard").value,
           _Password: document.getElementById(index + "password").value,
          _First_Name: document.getElementById(index + "firstName").value,
          _Last_Name: document.getElementById(index + "lastName").value,
          _Phone_No: document.getElementById(index + "phoneNumber").value,
          _User_Name: document.getElementById(index + "userName").value,
          _Email: document.getElementById(index + "email").value,
        }
      })
      .then((response) => {
        console.log(response);
        this.getData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete customer
  deleteCustomer = (index, id) => {
    const userName = sessionStorage.getItem('adminUserName')
    const password = sessionStorage.getItem('adminPassword')
    axios
      .delete("http://localhost:52832/api/administrator/removecustomer", {
        headers: {
          Authorization: "Basic " + btoa(`${userName}:${password}`),
        },
        data: {
          _Id: id,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("customer deleted");
        this.getData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  RendomNum =()=>{
     let num = Math.floor((Math.random() * 10) );
     console.log(num)
    return num
  }

  render() {
    const { listcustomers } = this.state;
 let num
    return listcustomers.map((listCustomer, index) => (
     num =  this.RendomNum(),
    console.log(num),
      <div className='mainDiv' key={listCustomer._Id}>
        <div id={listCustomer._Id}>
          <img style={{borderRadius:'40px' ,float:'left'}} width="80px" height="80px" src={ imgArray[num]} alt='nothinssg'></img>
        <Table striped bordered hover>
          <tbody>
            <CustomerAdminFirstLine />
            <tr>
            <td>id:{listCustomer._Id}</td>
              <td>
                <input
                  type="text"
                  id={index + "firstName"}
                  name="firstName"
                  placeholder={listCustomer._First_Name}
                  defaultValue={listCustomer._First_Name}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  name="lastName"
                  id={index + "lastName"}
                  placeholder={listCustomer._Last_Name}
                  defaultValue={listCustomer._Last_Name}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="email"
                  id={index + "email"}
                  name="email"
                  placeholder={listCustomer._Email}
                  defaultValue={listCustomer._Email}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id={index + "userName"}
                  name="userName"
                  placeholder={listCustomer._User_Name}
                  defaultValue={listCustomer._User_Name}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
            </tr>
            <CustomerAdminSecondLine />
            <tr>
            <td>     <input
            type="hidden"
            id={index + "id"}
            name="hidden"
            placeholder={listCustomer._Id}
            defaultValue={listCustomer._Id}
            onChange={this.handleChange}
            required
          ></input></td>
              <td>
                <input
                  type="text"
                  id={index + "phoneNumber"}
                  name="phoneNumber"
                  placeholder={listCustomer._Phone_No}
                  defaultValue={listCustomer._Phone_No}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id={index + "creditCard"}
                  name="creditCard"
                  placeholder={listCustomer._Credit_Card_Number}
                  defaultValue={listCustomer._Credit_Card_Number}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  id={index + "address"}
                  name="address"
                  placeholder={listCustomer._Address}
                  defaultValue={listCustomer._Address}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
              <td>
                <input
                  type="password"
                  id={index + "password"}
                  name="password"
                  placeholder={listCustomer._Password}
                  defaultValue={listCustomer._Password}
                  onChange={this.handleChange}
                  required
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
        </div>
        <Button variant="primary" onClick={() => this.updateCustumer(index, listCustomer._Id)}>
          Update
        </Button>
        <Button variant="warning" onClick={() => this.deleteCustomer(index, listCustomer._Id)}>
          Delete
        </Button>
        <hr />
      </div>
    ));
  }
}

export default CustomerAdmin;
