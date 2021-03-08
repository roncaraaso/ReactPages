import React, { Component } from 'react'
import { Navbar ,Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { withRouter} from "react-router-dom";


export class LoginNavbar extends Component {



    render() {
      console.log(this.props)
   
        return (
            <div> 
            <Navbar bg="light"  className="justify-content-center" variant="light">
            <Nav variant="tags" >
            <LinkContainer to='/Anonymous'><Nav.Link  eventKey="link-1">Anonymous </Nav.Link></LinkContainer>
            
                </Nav>
                </Navbar>
            </div>
        )
    }
}

export default  withRouter(LoginNavbar)
    