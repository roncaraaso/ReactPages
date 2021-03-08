import React, { Component   } from 'react'
import { Navbar ,Nav , } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
export class NavAdmin extends Component {
    render() {
        return (
            <div>
            <Navbar bg="light"  className="justify-content-center" variant="light">
            <Nav variant="tabs" >
                
                 <LinkContainer to='/HomeAdmin/Inbox'><Nav.Link >Inbox </Nav.Link></LinkContainer>
                 <LinkContainer to='/HomeAdmin/AirlineAdmin'><Nav.Link>Edit Airline</Nav.Link></LinkContainer>
                 <LinkContainer to='/HomeAdmin/FlightAdmin'><Nav.Link>Search Flights</Nav.Link></LinkContainer>
                 <LinkContainer to='/HomeAdmin/CustomerAdmin'><Nav.Link>Edit Customer </Nav.Link></LinkContainer>
                 </Nav>
                 </Navbar>
            </div>
        )
    }
}

export default NavAdmin
