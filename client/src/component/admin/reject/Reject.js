import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApplicationContext } from '../../../stores/ApplicationContext'
import { UserContext } from '../../../stores/UserContext'
import axios from 'axios'
import './reject.css'

export default function Rejected() {

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
            Navigate('/rejected')
        } else Navigate("/admin/login")
        console.log("enkdjab");
        axios.get("http://localhost:4000/admin/rejected").then((response => {
            if (response) 
            setApplications(response.data)
            setForms(response.data)
            console.log(response.data);
        })).catch(error => console.log(error))
    }, [Navigate]);

  
  return (
    <div class="container mx-auto px-4 sm:px-8 dash">
    <div class="py-8">
        <div>
            <h2 class="text-2xl font-semibold leading-tight"> REJECTED APPLICATIONS</h2>
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
                        <td className="text-center p-4">{obj.company_name}</td>
                        <td className="text-center text-red-500">{obj.status}</td>
                                  
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