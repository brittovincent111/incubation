
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useRef } from 'react';
import { UserContext } from '../../../stores/UserContext';
import { Link } from 'react-router-dom'


function Application() {

  // let userDetails= {_id  : "10"}



  // const [image, setImage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { userDetails, setUserDetails, removeCookie } = useContext(UserContext)
  const [application, setApplication] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    company_name: "",
  })

  const navigate = useNavigate()

  const logout = () => {
    alert("Logout Sucessfully")
    console.log("clickeddd logout ")
    localStorage.removeItem('user');
    setUserDetails(null)
    removeCookie("jwt");
    navigate("/login");
  };

  // let userDetails = JSON.parse(localStorage.getItem('user'))
  // console.log(userDetails, " userdaetttttttt")
  // console.log(userDetails._id, "dsfsdfsdf userdaetttttttt")

  function handleSubmit(e) {
    e.preventDefault()
    if (!application.name) {
      setErrorMessage("Name is required")
    } else if (application.name.length < 3) {
      setErrorMessage("Name must be atleast 3 characters");
    } else if (!application.name.match(/^[A-Za-z][A-Za-z ]*$/)) {
      setErrorMessage("Enter a valid name");
    } else if (!application.address) {
      setErrorMessage("Address is required");
    } else if (!application.email) {
      setErrorMessage("Email is required");
    } else if (!application.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
      setErrorMessage("Enter a valid email");
    } else if (!application.phone) {
      setErrorMessage("Phone is required");
    } else if (application.phone.match(/[^0-9]/g)) {
      setErrorMessage("Enter a valid Phone number");
    } else if (application.phone.length !== 10) {
      setErrorMessage("Phone must be 10 characters");
    } else if (!application.company_name) {
      setErrorMessage("Company name is required");

    } else {
      console.log(userDetails._id);
      axios.post(`http://localhost:4000/application/${userDetails._id}`, { ...application })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data))
          // setUserDetails(response.data)
          console.log(response.data + "this is response after update");
          navigate('/success')
        }).catch((err) => {
          alert("already applied")
          console.log('error')
        })
    }

  }

  function handleChange(e) {
    setApplication({ ...application, [e.target.name]: e.target.value })
  }

  return (
<div className='h-screen w-screen  '>

    <div className='p-10'>
      <button onClick={logout} type="button" class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out float-right">Log Out</button>

      
    </div>

<div className=' ' >


<h1 className='text-red-600 font-bold text-2xl px-5  flex justify-center'>Application Form </h1>
{/* <div className='mt-20 border-t-2 border-blue-300' ></div> */}
<form className='mt-20 border-t-2 border-blue-300 px-10'  >
{errorMessage && <div className="p-5 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}

  <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
    
    <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
      <input type="text" name="name" id="name" placeholder='Name *' onChange={(e) => { handleChange(e) }} className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
    </div>
    <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
      <input type="text" name="address" onChange={(e) => { handleChange(e) }} id="address" placeholder='Address' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
    </div>

    <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
      <input type="text" name="email" onChange={(e) => { handleChange(e) }} id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
    </div>
    <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
      <input type="text" name="phone" onChange={(e) => { handleChange(e) }} id="phone" placeholder='Phone no' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
    </div>
    <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
      <input type="text" name="company_name" onChange={(e) => { handleChange(e) }} id="company_name" placeholder='Company Name' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
    </div>
    {/* <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                        <input ref={imageRef} type="file" name="image" onChange={fileUpload}  id="image" placeholder='Image' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                    </div> */}


    <div>
      <label htmlFor="" className='text-left'>Type of Incubation needed *</label>
      <div className="flex">
        <div className=' p-2 flex items-center pl-0'>
          <input type="radio" name="Incubation" value="physical" id="physical" placeholder='' onChange={(e) => { handleChange(e) }} className=' ' required />
          <label for="physical" class="text-sm font-medium text-gray-900 ml-2 block" >Physical Incubation</label>
        </div>
        <div className='p-2 flex items-center'>
          <input type="radio" name="Incubation" value="virtual" id="virtual" placeholder='' onChange={(e) => { handleChange(e) }} className=' ' required />
          <label for="virtual" class="text-sm font-medium text-gray-900 ml-2 block">Virtual Incubation</label>
        </div>
      </div>
    </div>
  </div>
  <div className='px-5 w-fit mx-auto pb-5'>
    <button onClick={(e) => handleSubmit(e)} className='border-2 text-blue-800 border-blue-800 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-blue'>Submit</button>
  </div>

</form>
</div>
</div>

  )
}



export default Application