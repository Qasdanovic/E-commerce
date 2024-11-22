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
            <Link to="#" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="#" className="text-gray-600 hover:text-indigo-600">Shop</Link>
            <Link to="#" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="#" className="text-gray-600 hover:text-indigo-600">Contact</Link>
            <Link to="#" className="text-gray-600 hover:text-indigo-600">Cart ({userCart && userCart.items.length})</Link>
            <Link to="/deconnect" className="text-red-600 hover:text-red-400">
              deconnection
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
