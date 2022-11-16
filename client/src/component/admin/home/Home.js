import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../stores/UserContext";
import { ApplicationContext } from "../../../stores/ApplicationContext";
import Axios from 'axios'
import './Home.css'

 export default function Home () {

  const Navigate = useNavigate()

  const { setAdminDetails, removeCookie } = useContext(UserContext)
  const { applications, setApplications } = useContext(ApplicationContext)
//   const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [forms, setForms]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: '', address: '', email: '',
    phone: '', company_name: '', Incubation: '',
    image: '', status: ''
});
useEffect(()=>{
    let userData = localStorage.getItem('admin')
    if (userData){
        Navigate('/admin') 
      

    } 
    
    else{

        Navigate("/admin/login");
    } 

},[Navigate])


  useEffect(() => {
   
    Axios.get('http://localhost:4000/admin/app').then((response) => {
        if (response.data) {
            const { data } = response
            setApplications(data)
            setForms(data)
            console.log(setForms);
        } else {
            setErrorMessage('Something went wrong')
        }
    }).catch((err) => {
        console.log(err);
        setErrorMessage('Something went wrong')
    })
})

const fullDetails = (id) => {
    console.log(applications)
    applications.filter((obj) => {
        if (obj._id === id) {
            setModalData({
                name: obj.name, address: obj.address, email: obj.email,
                phone: obj.phone, company_name: obj.company_name, Incubation: obj.Incubation,
                image: obj.image, status: obj.status
            })
            setShowModal(true)
        }
    })
}

// const details = () =>{
//     console.log("opopo");
    

// }
// details()

// forms.filter((obj)=>{
//     if(obj.status == 'rejected')
//     console.log("klklklk");
//     console.log(obj);
// })


// const approveForm = (id) => {
//     Axios.post("http://localhost:5000/admin/approve/" + id ).then((result =>{
//         console.log(result.status );
//         if (result.status === 200) forceUpdate()
        
//     }))
// }

const  approveForm = (id) =>{
    Axios.post('http://localhost:4000/admin/approve/'+id).then((result) => {
        if (result.status == 200) {
            // alert("hiiii")
        //    setApplications(null)
            console.log(result);
        } else {
            setErrorMessage('Something went wrong')
        }
    }).catch((err) => {
        setErrorMessage(err)

    })
}


const rejectForm = (id) => {
    Axios.post("http://localhost:4000/admin/reject/"+ id).then((result => {
        
        console.log(result);
}))
}

  return (

    
      <div class="container mx-auto px-4 sm:px-8 dash">
    <div class="py-8">
        <div>
            <h2 class="text-2xl font-semibold leading-tight">APPLICATIONS</h2>
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
                                USER-ID
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                APPLICANT
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
                        <td className="text-center">{obj._id}</td>
                        <td className="text-center">{obj.name}</td>
                        <td className="text-center">{obj.company_name}</td>
                        <td className="text-center">{obj.status}</td>
                        <td className="text-center p-4 ">
                        <button type="button" class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"  onClick={(e) => { fullDetails(obj._id) }}>Open</button>
                        <button type="button" class=" m-2  inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-purple-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-200 active:shadow-lg transition duration-150 ease-in-out"  onClick={(e) => { approveForm(obj._id) }}>Approve</button>
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

{showModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">{modalData.company_name}</h3>
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
                                <div className="relative p-6 flex-auto">
                                    <table>
                                        <tbody className='flex flex-col '>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Name : </th>
                                                <td width="200px">{modalData.name}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Email : </th>
                                                <td width="200px">{modalData.email}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                                <td width="200px">{modalData.phone}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Address : </th>
                                                <td width="200px">{modalData.address}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Incubation : </th>
                                                <td width="200px"> {modalData.Incubation}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Status : </th>
                                                <td width="200px">{modalData.status}</td>
                                            </tr>
                                            {/* <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Logo : </th>
                                                <td width="200px"><img src={`/images/${modalData.image}`} alt="" className='w-[100px] ' /></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) }



     </div>
                                        
  )
}