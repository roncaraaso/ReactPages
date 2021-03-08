import React, { Component } from 'react'
import { Navbar ,Nav , } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'



export class NavCustomer extends Component {
    render() {
    
        return (
            <div>
            <Navbar bg="light"  className="justify-content-center" variant="light">
            <Nav variant="tabs"  >
                <LinkContainer to='/MainCustomer/UpdateCustomer'><Nav.Link>Updte Customer</Nav.Link></LinkContainer>
                <LinkContainer to='/MainCustomer/EditTickets'><Nav.Link>Edit Tickets</Nav.Link></LinkContainer>
                <LinkContainer to='/MainCustomer/BuyTickt'><Nav.Link>Buy Tickets</Nav.Link></LinkContainer>
                <LinkContainer to='/MainCustomer/SearchFlights'><Nav.Link>Search Flights</Nav.Link></LinkContainer>
                <LinkContainer to='/MainCustomer'><Nav.Link>Back</Nav.Link></LinkContainer>
                </Nav>    
                </Navbar>
            </div>
        )
    }
}

export default NavCustomer
