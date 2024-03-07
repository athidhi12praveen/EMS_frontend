import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { allusers } from '../Services/AllApi'
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../Services/baseUrl';

function View() {

  const[showspin,setshowspin]=useState(true)

  const[user,setUser]=useState({})

  const {id}=useParams()
  console.log(id);

  // api call for getting single user details
  const getuser=async()=>{
    const {data}=await allusers("")
    // console.log(data);

    // console.log(data.find(item=>item._id===id));

    setUser(data.find(item=>item._id===id))

  }

  console.log(user);

  useEffect(()=>{

    getuser()

    setTimeout(()=>{
      setshowspin(false)
    },2000);

  },[])

  return (

    <>

      {

        showspin?

        <LoadingSpinner/>:

        <div className='container' style={{height:'80vh'}}>

        {

          user?

          <Card className='shadow col-lg-6 mt-5 p-3' style={{marginLeft:'320px',marginRight:'320px'}}>

            <div className='text-center'>

              <img style={{width:'70px', height:'70px', borderRadius:'50%'}} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />

            </div>

            <div className='text-center'>

              <h5>User Name : {user.fname}{user.lname}</h5>
              <h5>E-mail : {user.email}</h5>
              <h5>Mobile : {user.mobile}</h5>
              <h5>Gender : {user.gender}</h5>
              <h5>Status : {user.status}</h5>
              <h5>Loaction : {user.location}</h5>

            </div>

          </Card>:""

        }

        </div>

      }

    </>

  )

}

export default View