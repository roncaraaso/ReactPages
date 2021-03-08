import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from "react-bootstrap";


class Inbox extends Component {
constructor(props) {
  super(props)

  this.state = {
     airLineIboxArray :[],
     x : [],

     finalArray :[],
     helperArray :[],
     updatePage:""
  }
}

get =()=>{
  const { helperArray } = this.state
  const userName = sessionStorage.getItem('adminUserName')
  const password = sessionStorage.getItem('adminPassword')
  //geting from redis the data for inbox display
 axios({
  method:'GET',
  url:"http://localhost:52832/api/administrator/GetAirlineFromRedis",
  headers:{
    Authorization: "Basic " + btoa(`${userName}:${password}`),
  }
}).then(res=>{
  console.log(res.data);
  this.setState({airLineIboxArray:res.data})

// seting from data for display cuting the array and srtings to new and clean array
 for(let i =0 ; i< this.state.airLineIboxArray.length; i++){
  
     if(this.state.airLineIboxArray[i] !== null){
      this.state.x = this.state.airLineIboxArray[i].split(',')
     //data for airline company
      let airline = this.state.x[1].split(':')
      let userName = this.state.x[2].split(':')
      let password = this.state.x[3].split(':')
      let countryCode = this.state.x[4].split(':')
      let firstName = this.state.x[5].split(':')
      let lastName = this.state.x[6].split(':')
      let phoneNum = this.state.x[7].split(':')
      let email = this.state.x[8].split(':')
      let areaCode = this.state.x[9].split(':')
      // redis key
      let key = this.state.x[10].split(':')
    helperArray.push([airline,userName,password,countryCode,firstName,lastName,phoneNum,email,areaCode ,key])
     
     }

 }
 // seting new array after looping and organizing to new array
 this.setState( {finalArray : helperArray})
}) .catch((err) => {
  console.log(err);
});
}
componentDidMount(){
this.get()

}

createAirline =(id ,key)=>{
  const userName = sessionStorage.getItem('adminUserName')
  const password = sessionStorage.getItem('adminPassword')
  const{finalArray} = this.state
console.log(finalArray[id][7][1],)
//post data to server after after admin  accepted the airline company 
 axios({
    method:'POST',
    url:"http://localhost:52832/api/administrator/createnewairline",
    data:{
               
                    _First_Name :finalArray[id][4][1] ,
                    _Last_Name : finalArray[id][5][1],
                    _AirLine_Name: finalArray[id][0][1],
                    _User_Name: finalArray[id][1][1],
                    _Password: finalArray[id][2][1],
                    _Country_Code: finalArray[id][3][1],
                    _Email: finalArray[id][7][1],
                    _Phone_Number: finalArray[id][6][1],
                    _Area_Code: finalArray[id][8][1] 
    },
    headers:{
      Authorization: "Basic " + btoa(`${userName}:${password}`),
    }
  }).then(res =>{
    console.log(res)
 
  }).catch(err=>{
    console.log(err)
  })

  this.rejactAirline(id ,key)
}


rejactAirline =(id , key)=>{
  const userName = sessionStorage.getItem('adminUserName')
  const password = sessionStorage.getItem('adminPassword')
  const{finalArray} = this.state
// send axios to delete from redis witj redis  key...

axios({
  method:'DELETE',
  url:"http://localhost:52832/api/administrator/DeleteAirlineFromRedis/"+key,
 data:{
  _Email: finalArray[id][7][1],
 },
  headers:{
    Authorization: "Basic " + btoa(`${userName}:${password}`),
  }
}).then(res =>{
  console.log(res)

}).catch(err=>{
  console.log(err)
})
}


  render() {
    const {finalArray } = this.state
   console.log(finalArray)
    return (
     <div>
      {finalArray.length > 0 ? finalArray.map((final,index)=>(
      
        <div className='mainDiv' key={index}>
            <Table striped bordered hover key={final._Id} >
            <thead>
            <tr>
              <td>User Name</td>
              <td>Password</td>
              <td>Country</td>
              <td>Email </td>
              <td>Airline Name</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{final[1][1]}</td>
                <td>{final[2][1]}</td>
                <td>{final[3][1]}</td>
                <td>{final[7][1]}</td>
                <td>{final[0][1]}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={()=>this.createAirline(index ,final[9][1])}>Accept</Button>
          <Button variant="warning" onClick={()=>this.rejactAirline(index ,final[9][1])}>Reject</Button>
          </div>    
      )):<h1>Sorry  no requsts</h1>}
          </div>
    )
  }
}
export default Inbox


