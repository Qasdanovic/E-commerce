import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Navbar() {
  const userId = Cookies.get('userId')
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
            <Link to="#" className="text-gray-600 hover:text-indigo-600">Cart (0)</Link>
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
