import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    name : '',
    email : '',
    password : '',
    confirmPassword : '',
    phone : '',
    address : '',
  });

  


  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrors({
      name : '',
      email : '',
      password : '',
      confirmPassword : '',
      phone : '',
      address : '',
    })

    let hasError = false;

    if (!email || !name || !password || !confirmPassword || !phone || !address){
      toast.error('all inputs are required !')
      hasError = true
    }

    if (!name){
      setErrors(prev => {
        return {...prev , name : 'name is required'}
      })
      hasError = true
    }

    if (!email){
      setErrors(prev => {
        return {...prev , email : 'email is required!'}
      })
      hasError = true
    }

    if (!password){
      setErrors(prev => {
        return {...prev , password : 'password is required!'}
      })
      hasError = true
    }

    if (password && password.length < 6){
      setErrors(prev => {
        return {...prev , password : 'password must be 6 or more caracters!'}
      })
      hasError = true
    }



    if (!confirmPassword){
      setErrors(prev => {
        return {...prev , confirmPassword : 'you have to confirm password'}
      })
      hasError = true
    }

    if (password !== confirmPassword){
      setErrors(prev => {
        return {...prev , confirmPassword : 'both passwords not match!'}
      })
      hasError = true
    }

    if (!address){
      setErrors(prev => {
        return {...prev , address : 'address is required!'}
      })
      hasError = true
    }

    if (!phone){
      setErrors(prev => {
        return {...prev , phone : 'phone is required!'}
      })
      hasError = true
    }

    if (!hasError){
      try {
        await axios.post(`http://localhost:8080/users/add`, {
         name,
         email,
         password,
         address,
         phone
       })

       await axios.post("http://localhost:8080/cart/createCart", {
        "userEmail": email,
        "items": [
            {
                // "productId": "",
                // "quantity": 0
            }
        ],
        "totalPrice": 0
    })
 
       toast.success('you sign in succesfully, log in now')
       setName('')
       setEmail('')
       setAddress('')
       setPassword('')
       setConfirmPassword('')
       setPhone('')

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    
  };

  return (
    <div>
        <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">Sign Up</h2>
        <form onSubmit={handleSignup} className="mt-6">
          <div>
            <label className="block text-gray-700">name :</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              { errors.name && <div style={{'color' : 'red'}}>{errors.name}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email :</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            { errors.email && <div style={{'color' : 'red'}}>{errors.email}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">address :</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            { errors.address && <div style={{'color' : 'red'}}>{errors.address}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">phone :</label>
            <input
              type="tel"
              pattern='0-[5-6-7]-{8}[0-9]'
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            { errors.phone && <div style={{'color' : 'red'}}>{errors.phone}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password :</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div style={{'color' : 'red'}}>{errors.password}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Confirm Password :</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            { errors.confirmPassword && <div style={{'color' : 'red'}}>{errors.confirmPassword}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 hover:bg-indigo-500"
          >
            Sign Up
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SignupPage;

