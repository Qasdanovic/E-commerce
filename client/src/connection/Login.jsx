import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const req = await axios.post("http://localhost:8080/users/login", {
          email,
          password
        })

        toast.success(`welcome back mr/M ${req.data.emailMatch.name}`)
        

        Cookies.set("userId", req.data.emailMatch._id)
        Cookies.set("email", req.data.emailMatch.email)

        navigate('/')
        
      } catch (error) {
        toast.error("email or password is invalid!")
      }
      
    };
  return (
    <div>
        <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">Login</h2>
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 hover:bg-indigo-500"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  )
}
