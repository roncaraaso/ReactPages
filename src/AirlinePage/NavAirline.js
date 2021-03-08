import React, { Component } from 'react'
import { Navbar ,Nav  } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from "react-router-dom";
export class NavAirline extends Component {

    render() {
        return (
            <div>

            <Navbar bg="light"  className="justify-content-center" variant="light">
            <Nav variant="tabs" >
                <LinkContainer to='/MainAirline/AddFlight'><Nav.Link>Add Flight</Nav.Link></LinkContainer>
                <LinkContainer to='/MainAirline/UpdateAirline'><Nav.Link>Update Airline</Nav.Link></LinkContainer>
                <LinkContainer to='/MainAirline/EditFlights'><Nav.Link>Edit Flights</Nav.Link></LinkContainer>
                <LinkContainer to='/MainAirline/SearchFlights'><Nav.Link>Search Flights</Nav.Link></LinkContainer>
                <LinkContainer to='/'><Nav.Link>Back</Nav.Link></LinkContainer>
                </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavAirline
