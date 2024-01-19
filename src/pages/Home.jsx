import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allusers, deleteUser } from '../Services/AllApi'

function Home() {

  const{registerData,setregisterData}=useContext(registerContext)

  const[showspin,setshowspin]=useState(true)

  const[allUserData,setAllUserData]=useState([])

  const[search,setSearch]=useState("")

  useEffect(()=>{

    // call getallemployees function
    getAllEmployees()

    setTimeout(()=>{
      setshowspin(false)

    },2000);

  },[search])

  // function definition for get all data
  const getAllEmployees=async()=>{
    const response=await allusers(search)
    console.log(response);
    setAllUserData(response.data)
  }

  // delete employee
  const removeUser=async(id)=>{
    const response=await deleteUser(id)
    console.log(id);

    if(response.status==200){
      getAllEmployees()
    }

    else{
      alert("Operation Failed !!! Please try after some time")
    }

  }

  return (

    <>

      {

        registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible>
          {registerData.fname.toUpperCase()}registered successfully...
        </Alert>

      }
      
      {

showspin?
<LoadingSpinner/>:
      
            <div className='container mt-2'>

              <div className='search-all d-flex align-items-center'>

                <div className='search d-flex align-items-center'>

                  <span className='fw-bolder'>Search : </span>

                  <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search by employee name' className='form-control ms-3' style={{width:'300px'}}/>

                </div>

                <Link to={'/add'} className='btn btn-secondary ms-auto fw-bolder'>ADD <i class="fa-solid fa-user-plus ms-1"></i></Link>

              </div>

              <div className='table mt-5'>

                <h1 className='fw-bold'>List of all Employee</h1>

              <Hometable displayData={allUserData} removeuser={removeUser}/>

              </div>

            </div>

      }
      
    </>

  )
  }

export default Home