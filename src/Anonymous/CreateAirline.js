import React, { Component } from "react";
import {Form , Col , Row , Button } from 'react-bootstrap'
import axios from 'axios'

export class CreateAirline extends Component {

    checkPassword = ()=>{
      let password = document.getElementById("password").value;
      let confirmPassword =document.getElementById("confirmPassword").value
      const item =document.getElementById("confirmPassword").style
     
      if(  confirmPassword === password){
        item.color = "green"
        item.borderColor = "green"
      }else
      if(password!==undefined||null && confirmPassword !== password){
        item.color = "red"
        item.borderColor = "red"
      }
    }
    CreateAirline =()=>{
        let password = document.getElementById("password").value;
        let confirmPassword =document.getElementById("confirmPassword").value
        console.log(document.getElementById("password").value)
        if(password!== "" && password === confirmPassword){
            axios({
                url:"",
                method:"POST",
                data:{
                    
                         _First_Name:document.getElementById("firstName").value, 
                         _Last_Name:document.getElementById("lastName").value,  
                         _AirLine_Name:document.getElementById("company").value,
                         _User_Name:document.getElementById("userName").value,   
                         _Password:document.getElementById("password").value,    
                         _Country_Code:document.getElementById("").value,
                        _Email:document.getElementById("email").value, 
                        _Phone_Number:document.getElementById("phonNum").value,  
                        _Area_Code:document.getElementById("countryCode").value, 
                        
                },
                
            }).then(()=>{}).catch(()=>{})
        }
    
    
    }
  render() {
    return (
      <div style={{  marginLeft:"25%" , marginRight:"25%" }}>
        <Form>
          <Row>
            <Col>
            <Form.Label>First Name</Form.Label>
              <Form.Control type="text" id="firstName" placeholder="First Name" />
            </Col>
            <Col>
            <Form.Label>LastName address</Form.Label>
              <Form.Control type="text" id="lastName" placeholder="Last Name" />
            </Col>
          </Row>
          <Row>
          <Col>
          <Form.Label>Company</Form.Label>
            <Form.Control type="text" id="company" placeholder="Company" />
          </Col>
          <Col>
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" id="email" placeholder="Example@mail.com" />
          </Col>
        </Row>
        <Row>
        <Col>
        <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={this.checkPassword} id="password" placeholder="Password" />
        </Col>
        <Col>
        <Form.Label>Confirm Password </Form.Label>
          <Form.Control type="password" onChange={this.checkPassword} id="confirmPassword" placeholder="Confirm Password" />
        </Col>
      </Row>
      <Row>
      <Col>
      <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" id="phonNum" placeholder="Phone Number" />
      </Col>
      <Col>
      <Form.Label>User Name</Form.Label>
        <Form.Control type="text" id="userName" placeholder="User Name" />
      </Col>
    </Row>
    <Row>
    <Col>
    <Form.Label>Country Code </Form.Label>
      <Form.Control id="countryCode" placeholder="Country Code" />
    </Col>
  </Row>
  <Row>
  <Col>
 <Button onClick={this.CreateAirline}>Register</Button>
  </Col>
</Row>
        </Form>
      </div>
    );
  }
}

export default CreateAirline;
