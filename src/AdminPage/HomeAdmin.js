import React, {Component} from 'react'
import AirlineAdmin from './AilrlineAdmin'
 import SearchFlights from '../SearchFlights'
import CustomerAdmin from './CustomerAdmin'
import Inbox from './Inbox'
import NavAdmin from './NavAdmin'
import {Button}from 'react-bootstrap'
import '../index.css'


import {BrowserRouter  ,Route } from 'react-router-dom'

class HomeAdmin extends Component{
    
  Disconect =()=>{
    sessionStorage.clear()

    this.props.history.push('/')
  }
  
  render(){
      return(
        <div>

        <div className='helloSay'><h4>Hello :{sessionStorage.getItem('adminUserName')}</h4> </div>
       
        <Button className='Btn' onClick={this.Disconect} >Disconect</Button>
        <br></br>
        <br></br>
        <BrowserRouter>
        <NavAdmin/>
        <Route path='/HomeAdmin/AirlineAdmin' component={AirlineAdmin}/>
        <Route path='/HomeAdmin/FlightAdmin' component={SearchFlights}/>
        <Route path="/HomeAdmin/CustomerAdmin" component={CustomerAdmin}/>
        <Route path="/HomeAdmin/Inbox" component={Inbox}/>
        </BrowserRouter>
        </div>
       
       
 
      )
  }
}
export default HomeAdmin