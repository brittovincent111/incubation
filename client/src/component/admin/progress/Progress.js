import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './progress.css'

function Progress() {

    const [application,setApplication]=useState([])
    const Navigate = useNavigate();

    useEffect(() => {
        let userData = localStorage.getItem('admin')
        if (userData){
            Navigate('/progress') 
            console.log(userData)

        } 
        
        else{

            Navigate("/admin/login");
        } 
        console.log(application)
        axios.get("http://localhost:4000/admin/progress").then((response => {
            if (response) setApplication(response.data)
            console.log(response.data);
        })).catch(error => console.log(error))
    }, []);

    return (
        <div class="container mx-auto px-4 sm:px-8 dash">
            <div class="py-8">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight"> PROGRESS STATUS</h2>
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
                                        PROGRESS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    application.map((obj, index) => {



                                        return (

                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{obj.name}</td>
                                                <td className="text-center">{obj.email}</td>
                                                <td className="text-center">{obj.company_name}</td>
                                                <td className="text-center">{obj.status}</td>
                                                <td className="text-center p-4 ">
                                                    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-900 ">
                                                        <div class={` h-2.5 rounded-full ${obj.status === "approved" ? "w-[75%] bg-blue-600 dark:bg-blue-500" : obj.status === "rejected" ? "w-[50%] bg-red-600 dark:bg-red-500" : obj.status === "pending" ? "w-[25%] bg-orange-600 dark:bg-orange-500" : obj.status === "Booked" ? "w-[100%] bg-green-600 dark:bg-green-500" : ''}`}></div>
                                                    </div>
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


export default Progress