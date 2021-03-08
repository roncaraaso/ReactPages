import React, {Component} from 'react'
import {BrowserRouter  ,Route } from 'react-router-dom'
import AnonymousNavbar from './Components/AnonymousNavbar'
import { Button } from "react-bootstrap";
import CreateCustomer   from "./CreateCustomer";
import CreateAirline   from "./CreateAirline";
import { FutureFlights } from "./FutureFlights";
import Landing from "./Landing";
import { Depureture } from "./Depureture";
import '../index.css'



export class MainAnonymous extends Component {

    Disconect =()=>{
        sessionStorage.clear()
    
        this.props.history.push('/')
      }
      
    render() {
        return (
            <div>
            
            <div className='helloSay'><h4>Hello :Anonymous</h4> </div>
            <Button className='Btn' onClick={this.Disconect} >Login</Button>
            <br></br>
            <br></br>
              
                <BrowserRouter>
                <AnonymousNavbar/>
                <Route path='/Anonymous/FutureFlights' component={FutureFlights}/>
                <Route path='/Anonymous/CreateCustomer' component={CreateCustomer}/>
                <Route path='/Anonymous/CreateAirline' component={CreateAirline}/>
                <Route path='/Anonymous/Landing' component={Landing}/>
                <Route path='/Anonymous/Depureture' component={Depureture}/>
          
                </BrowserRouter>
 
            </div>
        )
    }
}

export default MainAnonymous
