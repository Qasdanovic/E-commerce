import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'

export default function Navbar() {
  const userId = Cookies.get('userId')
  const email = Cookies.get('email')
  const [userCart, setUserCart] = useState(null)

  useEffect(() => {
    if(email){
      axios.get(`http://localhost:8080/cart/getCartInfo/${email}`).then((response) => {
        setUserCart(response.data)
        console.log(userCart)
      })
    }
  }, [email])



  return (
    <div>
      {
        userId ? (
          <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-indigo-600">ShopEasy</Link>
          <nav className="flex space-x-6">
            <Link to="/" className="text-indigo-600 hover:text-indigo-400">Home</Link>
            <Link to="mailto:oussqas2002@gmail.com" className="text-indigo-600 hover:text-indigo-400">Contact</Link>
            <Link to="/Cart" className="text-green-600 hover:text-indigo-600 flex">
              <svg className="w-6 h-6 text-green-600 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
              </svg>
              <span>({userCart && userCart.items.length - 1})</span>
            </Link>
            <Link to="/deconnect" className="text-red-600 hover:text-red-400 flex">
              deconnection 
                <span>
                  <svg className="w-6 h-6 text-red-60 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                  </svg>
                </span>
            </Link>
          </nav>
        </div>
      </header>
        ) : (
          <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-indigo-600">ShopEasy</Link>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">login</Link>
            <Link to="/signup" className="text-gray-600 hover:text-indigo-600">signup</Link>
          </nav>
        </div>
      </header>
        )
      }
        
    </div>
  )
}
