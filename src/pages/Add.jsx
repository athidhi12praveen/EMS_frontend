import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../Services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';

function Add() {

  const{registerData,setregisterData}=useContext(registerContext)

  const navigate=useNavigate()

  const[showspin,setshowspin]=useState(true)

  // to hold normal user input
  const[normalInputs,setNormalUserInput]=useState({
    fname:"",
    lname:"",
    email:"",
    gender:"",
    location:""
  })

  // to hold status
  const[status,setStatus]=useState("")
  const[profile,setProfile]=useState("")

  const[preview,setPreview]=useState("")

  // define normal user input function
  const getandsetuserNormalInputs=(e)=>{
    const{name,value}=e.target
    setNormalUserInput({...normalInputs,[name]:value})
  }

  // handlefile
  const handlefile=(e)=>{
    // console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }

  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);

  useEffect(()=>{

    if(profile){
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile)
      )
    }

    setTimeout(()=>{
      setshowspin(false)
    },2000);
  },[profile])

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },

  ];

  // define submit function
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const{fname,lname,email,mobile,gender,location}=normalInputs

    if(!fname||!lname||!email||!mobile||!gender||!status||!profile||!location){
      alert('please fill the form completely')
    }

    else{
      // alert('Form filled completely')
      const data=new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("profile",profile)
      data.append("location",location)

      const headers={
        "content-type":"multipart/form-data"
      }

      // API call 
      const response=await addUser(data,headers)
      console.log(response);

      if(response.status==200){
        setNormalUserInput({...normalInputs,
          fname:"",
          lname:"",
          email:"",
          gender:"",
          location:""
        })

        setStatus("")
        setProfile("")
        setregisterData(response.data)
        navigate('/')

      }

      else{
        alert('request failed')
      }
      
    }

  }

  return (

  <>

    {
      showspin?
      
      <LoadingSpinner/>:

       <div className='container mt-3'>

       <h1 className='text-center fw-bolder'>Add New Employee Details</h1>
 
       <div className='mt-3 shadow border rounded p-2'>
 
         <div className='text-center'>
 
         <img style={{width:'70px', height:'70px', borderRadius:'50%'}} src={preview?preview:"https://toppng.com/uploads/preview/businesswoman-blank-profile-picture-female-11563049297axzpapjulw.png"} alt="no image" />
 
         </div>
 
         <Form className='mt-5 p-3'>
 
             <Row>
 
               {/* first name */}
               <FloatingLabel className='mb-3 col-lg-6 ' controlId="floatingInputfname" label="First Name">
                 <Form.Control type="text" name='fname' placeholder="First Name" onChange={e=>getandsetuserNormalInputs(e)} value={normalInputs.value}/>
               </FloatingLabel>
 
               {/* last name */}
               <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
                 <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e=>getandsetuserNormalInputs(e)} value={normalInputs.value}/>
               </FloatingLabel>
 
               {/* email */}
               <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                 <Form.Control type="email" name='email' placeholder="Email" onChange={e=>getandsetuserNormalInputs(e)} value={normalInputs.value}/>
               </FloatingLabel>
 
               {/* mobile */}
               <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
                 <Form.Control type="text" name='mobile' placeholder="Mobile" onChange={e=>getandsetuserNormalInputs(e)} value={normalInputs.value}/>
               </FloatingLabel>
 
               {/* gender */}
               <Form.Group className='mb-3 col-lg-6'>
                 <Form.Label>Gender</Form.Label>
                 <Form.Check type={"radio"} name='gender' onChange={e=>getandsetuserNormalInputs(e)} value={"Male"} label={"Male"} />
                 <Form.Check type={"radio"} name='gender' onChange={e=>getandsetuserNormalInputs(e)} value={"Female"} label={"Female"} />
               </Form.Group>
 
               {/* status */}
               <Form.Group className='mb-3 col-lg-6'>
                 <Form.Label>Employee Status</Form.Label>
                 <Select onChange={e=>setStatus(e.value)} options={options} className='bg-primary'/>
               </Form.Group>
 
               {/* file upload */}
               <Form.Group className='mb-3 col-lg-6'>
                 <Form.Label>Upload Your Photo</Form.Label>
                 <Form.Control type="file" onChange={e=>handlefile(e)} name='profile'/>
               </Form.Group>
 
               {/* location */}
               <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatingInputlocation" label="Location">
                 <Form.Control type="text" name='location' placeholder="Location" onChange={e=>getandsetuserNormalInputs(e)} value={normalInputs.value}/>
               </FloatingLabel>
 
               <Button onClick={e=>handleSubmit(e)} className='bg-primary text-white fw-bolder' type='submit'>Submit</Button>
 
             </Row>
 
         </Form>
         
       </div>
 
     </div>

    } 

  </>

  )
}

export default Add