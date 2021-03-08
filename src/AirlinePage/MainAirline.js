import React, { Component } from 'react'
import AddFlight from './AddFlight'
import UpdateAirline from './UpdateAirline'
import EditFlights from './EditFlights'
import {BrowserRouter ,Route} from 'react-router-dom'
import NavAirline from './NavAirline'
import SearchFlights from '../SearchFlights'
import {Button}from 'react-bootstrap'
import '../index.css'


export class MainAirline extends Component {

    
Disconect =()=>{
    sessionStorage.clear()
    this.props.history.push('/')
  }

    render() {
        return (
            <div>
            <div className='helloSay'><h4>Hello:{sessionStorage.getItem('airlineUserName')}</h4></div>
            <Button className='Btn' onClick={this.Disconect} >Disconect</Button>
            <br></br>
            <br></br>
            <BrowserRouter>            
            <NavAirline/> 
            <Route path='/MainAirline/AddFlight' component={AddFlight}/>
            <Route path='/MainAirline/UpdateAirline' component={UpdateAirline}/>
            <Route path="/MainAirline/EditFlights" component={EditFlights}/>
            <Route path="/MainAirline/SearchFlights" component={SearchFlights}/>
            </BrowserRouter>
            </div>
            
        )
    }
}

export default MainAirline
