import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {

    const navigate = useNavigate()

    const id = Cookies.get('userId');
    const email = Cookies.get('email');

    const [prevPass, setPrevPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const handelChangePassword = async () => {
        if(!prevPass || !newPass || !confirmPass){
            return toast.error("you have to valid all inputs")
        }

        if(newPass.length < 6 || confirmPass.length < 6){
            return toast.error("password must be 6 caracters or more !")
        }

        if(newPass !== confirmPass){
            return toast.error("you have to confirm the new password")
        }

        try {
            const req = await axios.put('http://localhost:8080/users/changePass', {
                id,
                email,
                "prevPassword": prevPass,
                "newPassword" : newPass
            })
            // console.log(req)
            if(req.status === 200){
                navigate(-1)
                return toast.success("password changed successfully")
            } 
                
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-indigo-600">Change Password :</h2>
                <div className="mt-4">
                    <label className="block text-gray-700">password :</label>
                    <input
                    type="password"
                    onChange={(e)=>setPrevPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
                    />

                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">new password :</label>
                    <input
                    type="password"
                    onChange={(e)=>setNewPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
                    />  
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700">confirm new password :</label>
                    <input
                    type="password"
                    onChange={(e)=>setConfirmPass(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        onClick={handelChangePassword}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 hover:bg-indigo-500">
                        change Password
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
