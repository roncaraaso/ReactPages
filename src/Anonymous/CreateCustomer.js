import React, { Component  } from 'react'
import {axios} from 'axios'
import {Button ,Form ,Col , Row} from 'react-bootstrap'

export class CreateCustomer extends Component {
    // post call to server to create new customer to database
    CreateCustomer=()=>{
        axios({
            url:"",
            method:"POST",
            headers:{

            },
            data:{
             _First_Name: document.getElementById("firstName").value,
             _Last_Name:document.getElementById("lastName").value,
             _User_Name:document.getElementById("userName").value,
             _Password:document.getElementById("password").value,
             _Address:document.getElementById("address").value,
             _Credit_Card:document.getElementById("creditCard").value,
             _Email:document.getElementById("Email").value,
             _Phone_No:document.getElementById("pohneNumber").value
            }
        }).then(()=>{}).catch(()=>{})
    }
     // displaying with colors if password if corret or no
    checkPassword= ()=>{
      let password = document.getElementById("password").value;
      let confirmPassword =document.getElementById("confirmPassword").value
      const item =document.getElementById("confirmPassword").style
      console.log(document.getElementById("password").value)
      if(  confirmPassword === password){
        item.color = "green"
        item.borderColor = "green"
      }else
      if(password!="" && confirmPassword !== password){
        item.color = "red"
        item.borderColor = "red"
      }
    }

    
    render() {
        return (
            <div style={{  marginLeft:"25%" , marginRight:"25%"}} >
     
            <Form>
            <Row>
              <Col>
              <Form.Label>First Name</Form.Label>
                <Form.Control type="text" id="firstName" placeholder="First Name" />
              </Col>
              <Col>
              <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" id="lastName" placeholder="Last Name" />
              </Col>
            </Row>
            <Row>
            <Col>
            <Form.Label>Email</Form.Label>
              <Form.Control id="email" placeholder="Email" />
            </Col>
            <Col>
            <Form.Label>User Name</Form.Label>
              <Form.Control type="text" id="userName" placeholder="User Name" />
            </Col>
          </Row>
          <Row>
          <Col>
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" onChange={this.checkPassword} placeholder="Password" />
          </Col>
          <Col>
          <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" id="confirmPassword" onChange={this.checkPassword} placeholder="confirm Password" />
          </Col>
        </Row>
        <Row>
        <Col>
        <Form.Label>Phone number</Form.Label>
          <Form.Control type="number" id="pohneNumber" placeholder="Pohne Number" />
        </Col>
        <Col>
        <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="number" id="creditCard" placeholder="Credit Card Number" />
        </Col>
      </Row>
      <Row>
      <Col>
      <Form.Label>Address</Form.Label>
        <Form.Control type="text" id="address" placeholder="Address" />
      </Col>
    </Row>
        
          </Form>

            </div>
        )
    }
}

export default CreateCustomer
