import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Application from '../../user/application/Application';
import './slot.css'

export default function Slot() {

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [applicationList, setApplicationList] = useState([]);
    const [sloatBooking, setSloatBooking] = useState([]);
    const Navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState({
        id: '',
        index: ''
    });

    useEffect(() => {
        let userData = localStorage.getItem('admin')
        console.log(applicationList, "appliactionList")
        if (userData) {
            Navigate('/slot')
        } else Navigate("/admin/login")
        axios.get("http://localhost:4000/admin/slots").then((response => {
            if (response) setSloatBooking(response.data)
            console.log("kjghkja");
            console.log(response.data);

        })).catch(error => console.log(error))

        axios.get("http://localhost:4000/admin/approved").then((response => {
            if (response) setApplicationList(response.data)
            console.log(response.data);
        })).catch(error => console.log(error))
    }, [Navigate, reducerValue]);

    const fullDetails = (slotNo) => {
        setSelected({
            ...selected,
            index: slotNo
        })
        console.log(selected, "sleceted.........")
        setShowModal(true)
        console.log(applicationList, "appppppppppppppp")
    }
    const bookSloat = () => {
      
        axios.get(`http://localhost:4000/admin/slotBooking?slotId=${selected.index}&companyId=${selected.id}`).then((response => {
            forceUpdate()
           
        })).catch(error => console.log(error))

    }


    return (
        
        <div className='flex justify-center w-full dash'>
            <div >
                <div className='flex justify-center w-full'>
                    <div className='w-28 h-28  bg-blue-900 flex justify-center items-center m-5 '>
                        <div className='text-white'>Booked</div>

                    </div>
                    <div>
                        <div className='w-28 h-28  bg-blue-300 flex justify-center items-center m-5 '>
                            <div>Not Booked</div>

                        </div>



                    </div>
                </div>
                <h1 className='text-blue-500 font-bold text-3xl p-7 text-center'>Booking Slots</h1>





                <div className='flex grid  grid-cols-5 gap-3'>

                    {
                        sloatBooking.map((item) => {

                            console.log(item.status , "itemssssssss")
                            return (

                                <div className={`  w-28 h-28 cursor-pointer   ${item.status ? "bg-blue-900" : "bg-blue-300"}`} onClick={() => item.status ? alert("This slot is Already Booked") : fullDetails(item.slotNo)}>{item.slotNo}</div>

                            )
                        })
                    }

                </div>






                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full min-w-[400px] bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Choose Company
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex justify-center">
                                        <select label="Select Version border-solid border-2 border-gray " onChange={(e) => {
                                            setSelected({
                                                ...selected,
                                                id: e.target.value,
                                            })
                                        }}>
                                            <option hidden selected>Select</option>
                                            {
                                                applicationList.map((iteams, index) => {
                                                    return (
                                                        <option value={iteams._id} >{iteams.company_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)} >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => selected.id ? bookSloat() : ''}
                                        >
                                       cd     Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}


            </div>
        </div>
     
    )
}
