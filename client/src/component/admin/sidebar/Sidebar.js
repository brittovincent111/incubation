import React, { useContext } from 'react'
import logo from '../../../photos/sidebar.png'
import user from '../../../photos/logo512.png'
import pg from '../../../photos/sidebar.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../../../stores/UserContext'


export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
    const { setAdminDetails, removeCookie } = useContext(UserContext)
    const [sidebar , setSidebar] = useState('')
    const [value , setValue] = useState(false)
    
  



   

    const handleLogout = () => {
      alert("logout successfully")
        localStorage.removeItem('admin')
        setAdminDetails(null);
        removeCookie("jwt");
        navigate('/admin/login');
      }

  


    const Menus = [
        { Dashboard: "Dashboard"},
        { Approve: "Approved List"},
        { Reject: "Rejected List"},
        { Slots: "Booking Slots " },
        { create: "Create Slots" },
        { progress: "Progress Status" },
    
      ];
  return (
<div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-100 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={logo}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"} h-8 w-8`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img 
            // src={pg}
            className={`cursor-pointer duration-500 h-10 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Incubation Management
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index} id={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-md items-center gap-x-4 `}
            >
              <img  className='h-8 w-8' src={user} />
              <span className={`${!open && "hidden"} origin-left duration-200   `}>
             
             
                <Link to='/approved' >{Menu.Approve}</Link>
                <Link to='/rejected'>{Menu.Reject}</Link>
                <Link to='/slot'>{Menu.Slots}</Link>
                <Link to='/admin'>{Menu.Dashboard}</Link>
                <Link to='/createslot' >{Menu.create}</Link>
                <Link to='/progress'>{Menu.progress}</Link>


              </span>

            </li>

          ))}
        </ul>
        <div className="p-8">
        <button  onClick={handleLogout} type="button" class="inline-block px-6 py-2.5 bg-green-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>

        </div>
      </div>

    </div>
  )
}
