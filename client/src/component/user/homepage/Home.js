import React, { useContext , useEffect } from 'react'
import '../../user/homepage/Home.css'
import { Link } from 'react-router-dom'
// import startUp from '../../../assets/images/2010.i039.003_business startup isometric.jpg'
import '../../user/homepage/Home.css'
import { UserContext } from '../../../stores/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const Navigate = useNavigate()
  const { setUserDetails, userDetails, cookies , removeCookie } = useContext(UserContext)
  
  const logout = () => {
    localStorage.removeItem('user');
    setUserDetails(null)
    removeCookie("jwt");
    Navigate("/login");
  };

  const onAppp = ()=>{

    console.log('hiiiii hello')
  }

  const onApp = ()=>{
    console.log('in get application form');
    console.log(userDetails._id)
    axios.get(`http://localhost:4000/applicationForm/${userDetails._id}`).then((res)=>{
      console.log(res);
     
        Navigate("/application")
      
    }).catch((err)=>{
      console.log(err);
      alert(err.response.data)
    })
  
  }

  useEffect (()=>{

    axios.post('http://localhost:4000/',{...cookies}).then((response)=>{
        //  console.log(response , "helooooooooooo")
         if(response.data.status == "errors") {
          console.log("no jwt token")
          window.location.href = '/login'

         }else{  
          console.log("have token")
          
        
         }

    })
  })



  // console.log("klklk")
  // console.log(userDetails);

  return (
    <div className='home w-full h-screen'>
      <div className='flex justify-end p-3'>
        {userDetails ?
          <button onClick={logout} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button> :
          <Link to='/login'><button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button></Link>
        }
      </div>
      <h1 className='text-3xl text-orange-600 font-bold m-1 flex justify-center '> {userDetails ? `Hey,Welcome ${userDetails.name}` : 'Welcome Entrepreneurs'}!</h1>
      <h3 className='text-xl m-5  flex justify-center  flex justify-center'>Share your  Ideas!</h3>
      {userDetails ?
        <div className=' flex justify-center	p-5'>
          <div className='h-100 w-100 border-2 p-10 flex justify-center border-stone-900'>
            <button  type="button" class="inline-block px-6 py-2.5 m-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex justify-center" onClick={onApp} >Click Here</button>
            <p className='p-3'>For Application Form !</p>
          </div>
        </div> :

<div className=' flex justify-center	p-5'>
<div className='h-100 w-100 border-2 p-10 flex justify-center border-stone-900'>
          <p className='px-5 flex justify-center'>Login for Application form </p>

          <Link to='/login'><button type="button" class="  flex justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button></Link>

        </div>
        </div>

      }
      <div className=' flex  justify-center'>
        {/* <img className='hey ' src={startUp}></img> */}

      </div>
    </div>
  )
}