import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApplicationContext } from '../../../stores/ApplicationContext'

import Axios from 'axios'

export default function Aprroved() {

    const Navigate = useNavigate()
    // const { setAdminDetails, removeCookie } = useContext(UserContext)
    const { applications, setApplications } = useContext(ApplicationContext)
    const [status, setStatus] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [forms, setForms]=useState([])
    // const handleLogout = () => {
    //   localStorage.removeItem('admin')
    //   setAdminDetails(null);
    //   removeCookie("jwt");
    //   navigate('/admin/login');
    // }

    useEffect(() => {
        let userData = localStorage.getItem('admin')
        if (userData) {
            console.log("kllkl");
            console.log(userData);
            Navigate('/approved')
        } else Navigate("/admin/login")
        console.log("enkdjab");
        Axios.get("http://localhost:4000/admin/approved").then((response => {
            if (response) 
            setApplications(response.data)
            setForms(response.data)
            console.log(response.data);
        })).catch(error => console.log(error))
    }, [Navigate]);

    const rejectForm = (id) => {
        Axios.post("http://localhost:4000/admin/reject/"+ id).then((result => {
            console.log(result.status);
    }))
    }

  return (
    <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
        <div>
            <h2 class="text-2xl font-semibold leading-tight"> APPROVED APPLICATIONS</h2>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                SL NO:
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                NAME
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                EMAIL
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                COMPANY_NAME
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                STATUS
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                                forms.map((obj, index) => {

                                
                                    
                      return  ( 
                      
                      <tr>
                        <td className="text-center">{index +1}</td>
                        <td className="text-center">{obj.name}</td>
                        <td className="text-center">{obj.email}</td>
                        <td className="text-center">{obj.company_name}</td>
                        <td className="text-center">{obj.status}</td>
                        <td className="text-center p-4 ">
                        <Link to='/slot'><button type="button" class=" m-2  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-purple-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-200 active:shadow-lg transition duration-150 ease-in-out">book slot</button></Link>
                        <button type="button" class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"  onClick={(e) => { rejectForm(obj._id) }}>REJECT</button>
                        </td>              
                        </tr>
                      )
                                })
                            }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
}
