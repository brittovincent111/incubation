import React from 'react'
import axios from 'axios'
import {useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../stores/UserContext';
import {useCookies} from 'react-cookie'


function Login() {
    const navigate = useNavigate()
   
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {setUserDetails, userDetails , setCookie}=useContext(UserContext)

  
   
    // let onChange = (e) => {

    //     setCredentail({ ...credential, [e.target.name]: e.target.value })
    //     console.log(credential)

    // }

   
       

    let onSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
               setErrorMessage("Email is required");
           } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
               setErrorMessage("Enter a valid email");
           } else if (!password) {
               setErrorMessage("Password is required");
           } else if (password.length < 4) {
               setErrorMessage("Password must be atleast 4 characters");
           } else if (password.length > 20) {
               setErrorMessage("Password must be less than 20 characters");
           } else {
               const { data } = await axios.post('http://localhost:4000/login', {
                   email: email,
                   password: password
               });
               if (data) {
                   if (data?.user) {
                     console.log(data.user , " user details")
                     setCookie('jwt',data.token, { path: '/' });
                     localStorage.setItem('user', JSON.stringify(data.user))
                     setUserDetails(data.user)
                       navigate("/");           
                   } else {
                       setErrorMessage(data)
                   }
               }else{
                   setErrorMessage('Something went wrong')
               }
           }
       } catch (error) {
           console.log(error.message);
       }
   }
    return (
        <form >

            <div className=" min-h-screen flex flex-col">

       
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Login</h1>
                       
                       <p>{errorMessage.email}</p>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            
                            onChange={(e)=> {setEmail(e.target.value)}}
                            
                            placeholder="Email" />
                        

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                        
                            onChange={(e)=> {setPassword(e.target.value)}}
                            placeholder="Password" />
                        

                        <button
                            type="submit"
                            onClick={(e) => onSubmit(e)} 
                            className="w-full text-center py-3 rounded bg-orange-800 text-white hover:bg-green-dark focus:outline-none my-1"
                        >Login</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-blue text-blue" href="/signup">
                            SignUp
                        </a>.
                    </div>
                </div>
            </div>
        </form>
    )
}


export default Login