import React, { Component } from 'react'
import {Button , Card ,Table  } from "react-bootstrap";
import axios from 'axios'
import { imgArray } from "./Components/PicComoponent";

export class FutureFlights extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             conntryNameArray:[],
             flightArray:[],
             airplaneNameArray:[],
             textBool: false,
        }
    }
    
    componentDidMount = ()=> {
       // console.log(this.state.textBool)
 axios("http://localhost:52832/api/anonymous/getallflights").then((res)=>{/*console.log(res)*/
 this.setState({flightArray :res.data})
 axios("http://localhost:52832/api/anonymous/getallcountries").then((res)=>{/*console.log(res)*/
 this.setState({conntryNameArray :res.data})
 for(let i = 0; i < this.state.conntryNameArray.length; i++){
   let country = this.state.conntryNameArray[i]._Country_Name
   this.setState((prev)=>({
     flightArray : prev.flightArray.map((flight)=>(
      flight._Destination_Contrey_Code === this.state.conntryNameArray[i]._Id?
      {...flight , _Destination_Contrey_Code : country} : flight
   ))
     }))
 }
 axios("http://localhost:52832/api/anonymous/getnamesofairplanes").then((res)=>{/*console.log(res)*/
 this.setState({airplaneNameArray :res.data})
 for(let i = 0; i < this.state.airplaneNameArray.length; i++){
  let air = this.state.airplaneNameArray[i]._AirLine_Name
  this.setState((prev)=>({
    flightArray : prev.flightArray.map((flight)=>(
     flight._AirlineCompany_Id === this.state.airplaneNameArray[i]._Id?
     {...flight , _AirlineCompany_Id : air} : flight
  ))
    }))
}
}).catch((err)=>{console.log(err)})
}).catch((err)=>{console.log(err)})
}).catch((err)=>{console.log(err)})

    }    

    RendomNum =()=>{
        let num = Math.floor((Math.random() * 10) );
    
       return num
     }
// changing bool to make div visible
     OpenDiv = () => {
     const {textBool} = this.state

        this.setState({ textBool : !textBool}) 
        
      }
   
   
    render() {

        const {flightArray , textBool} = this.state
      console.log(flightArray)
        return (
          <div style={{  marginLeft:"25%" , marginRight:"25%" }}>
          {flightArray.map((flight , index)=>(
            <div style ={{display:"inline-flex" ,margin:"2px"}}>
              <Card  key={index} style={{ width: '18rem'  }}>
              <Card.Img variant="top" style={{ width: '18rem' , height:"18rem" }} src={imgArray[this.RendomNum()]} />
              <Card.Body>
                <Card.Title>{flight._Destination_Contrey_Code}</Card.Title>
                <Card.Text>
                 Flight with {flight._AirlineCompany_Id} at {flight._Departure_Time}
                </Card.Text>
                <Button onClick={this.OpenDiv } variant="primary">Read More</Button>
                <Card.Text>{  textBool &&
                "Some quick example text to build on the card title and make up the bulk of " + 
                "the cards content."}
              </Card.Text>
              </Card.Body>
              
            </Card>
            </div>
          ))}
          
            </div>
        )
    }
}

export default FutureFlights



/*{flightArray.map((flight , index)=>(
  <td>
    <Card  key={index} style={{ width: '18rem'  }}>
    <Card.Img variant="top" style={{ width: '18rem' , height:"18rem" }} src={imgArray[this.RendomNum()]} />
    <Card.Body>
      <Card.Title>{flight._Destination_Contrey_Code}</Card.Title>
      <Card.Text>
       Flight with {flight._AirlineCompany_Id} at {flight._Departure_Time}
      </Card.Text>
      <Button onClick={this.OpenDiv } variant="primary">Read More</Button>
      <Card.Text>{  textBool &&
      "Some quick example text to build on the card title and make up the bulk of " + 
      "the cards content."}
    </Card.Text>
    </Card.Body>
    
  </Card>
  </td>
))}*/