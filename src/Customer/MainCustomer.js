import React, { Component } from 'react'
import {BrowserRouter ,Route} from 'react-router-dom'
import NavCustomer from './NavCustomer'
import UpdateCustomer from'./UpdateCustomer'
import EditTickets from './EditTickets'
import BuyTickt from './BuyTickt'
import SearchFlights from '../SearchFlights'
import '../index.css'
import {Button}from 'react-bootstrap'
export class MainCustomer extends Component {
    Disconect =()=>{
  sessionStorage.clear()
        this.props.history.push('/')
      }
    render() {
        return (  
             <div>
            <div className="hellosay"><h4>Hello:{sessionStorage.getItem('customerUserName')}</h4></div>
            <Button className="Btn" onClick={this.Disconect} >Disconect</Button>
            <br></br>
            <br></br>
            <BrowserRouter>
            <NavCustomer/>
            <Route path='/MainCustomer/UpdateCustomer' component={UpdateCustomer}/>
            <Route path='/MainCustomer/EditTickets' component={EditTickets}/>
            <Route path="/MainCustomer/BuyTickt" component={BuyTickt}/>
            <Route path='/MainCustomer/SearchFlights' component={SearchFlights}/>

            </BrowserRouter>
            </div>
        )
    }
}

export default MainCustomer
