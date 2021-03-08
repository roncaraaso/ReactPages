import React from 'react';
import HomeAdmin from "./AdminPage/HomeAdmin"
import MainAirline from "./AirlinePage/MainAirline"
import MainCustomer from './Customer/MainCustomer';
import Login from './LogIn'

import { BrowserRouter, Route } from "react-router-dom";

import MainAnonymous from './Anonymous/MainAnonymous';

function App() {

  return (

    <div>
    <BrowserRouter>
    <Route exact path='/'><Login/></Route>
    <Route  path="/MainCustomer" component={MainCustomer}></Route> 
    <Route  path="/HomeAdmin" component={HomeAdmin}></Route> 
    <Route  path="/MainAirline" component={MainAirline}></Route> 
    <Route  path="/Anonymous" component={MainAnonymous}></Route> 

    </BrowserRouter>
 
    </div>
  );   
}

export default App;
