import {React ,Component}from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar , Nav} from 'react-bootstrap';


export class AnonymousNavbar extends Component {
 
    render(){
    return (
        <div>
        
        <Navbar bg="light"  className="justify-content-center" variant="light">
        <Nav variant="tabs" >
        <LinkContainer to='/Anonymous/Depureture'><Nav.Link >Depureture</Nav.Link></LinkContainer>
        <LinkContainer to='/Anonymous/Landing'><Nav.Link >Landing</Nav.Link></LinkContainer>
        <LinkContainer to='/Anonymous/CreateCustomer'><Nav.Link  >Create Customer</Nav.Link></LinkContainer>
        <LinkContainer to='/Anonymous/FutureFlights'><Nav.Link  >Future Flights</Nav.Link></LinkContainer>
        <LinkContainer to='/Anonymous/CreateAirline'><Nav.Link  >Create Airline</Nav.Link></LinkContainer>
        </Nav>
        </Navbar>
        </div>
    )
}
}

export default AnonymousNavbar
