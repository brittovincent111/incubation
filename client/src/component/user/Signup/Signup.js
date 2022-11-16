import React from 'react'
import { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'



function Signup() {
    const [name,SetName] = useState('');
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const [phone,SetPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    // console.log(watch('username'));
    
    const onSubmit =  async (e)=>{
        e.preventDefault()
    console.log("handle su");
    try {
        if (!name) {
            setErrorMessage("Name is required");
        } else if (name.length < 3) {
            setErrorMessage("Name must be atleast 3 characters");
        } else if (!name.match(/^[A-Za-z][A-Za-z ]*$/)) {
            setErrorMessage("Enter a valid name");
        } else if (!email) {
            setErrorMessage("Email is required");
        } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
            setErrorMessage("Enter a valid email");
        } else if (!phone) {
            setErrorMessage("Phone is required");
        } else if (phone.match(/[^0-9]/g)) {
            setErrorMessage("Enter a valid Phone number");
        } else if (phone.length !== 10) {
            setErrorMessage("Phone must be 10 characters");
        
        } else if (!password) {
            setErrorMessage("Password is required");
        } else if (password.length < 4) {
            setErrorMessage("Password must be atleast 4 characters");
        } else if (password.length > 20) {
            setErrorMessage("Password must be less than 20 characters");
        } else {

    const {data} = await axios.post('http://localhost:4000/signup',{
        name:name,
        phone:phone,
        email:email,
        password:password
    // }).then(response => console.log(response.data))
    // }
        });
        console.log("hjhhgg");
        console.log(data);
        if (data.existerror) {
            console.log("existerror")
            setErrorMessage('Email id exists')
            
        }else{
            navigate("/login"); 
            console.log("login")  

        }
    }
} catch (error) {
    console.log(error.message);
}
}
    return (
        <form >
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            onChange={(e)=> {SetName(e.target.value)}}

                            placeholder="Full Name" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            onChange={(e)=> {SetEmail(e.target.value)}}

                            placeholder="Email" />
                        <input
                            type="number"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="phone"
                            onChange={(e)=> {SetPhone(e.target.value)}}

                            placeholder="Phone Number" />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            onChange={(e)=> {SetPassword(e.target.value)}}

                            placeholder="Password" />
                      

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-orange-800 text-white hover:bg-green-dark focus:outline-none my-1"
                            onClick={(e) => onSubmit(e)} 
                        >Create Account</button>

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
                        <a className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup