import React from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Product({prod}) {

  const navigate = useNavigate()
  const userEmail = Cookies.get('email')
  const [userCartItems, setUserCart] = useState([])

  useEffect(() => {
    if(userEmail){
      axios.get(`http://localhost:8080/cart/getCartInfo/${userEmail}`).then((response) => {
        setUserCart(response.data.items)
      })
    }
  }, [])


  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-300" onClick={() => {
      navigate('/productInfo/'+prod._id)
    }}>
        <img src={prod.images[0]} alt="Product 2" className="w-full h-48 object-cover mb-4" loading='lazy' />
        <h3 className="text-lg font-semibold text-gray-800">{prod.title}</h3>
        <p className="text-gray-600">{prod.price}$</p>
        {
          userCartItems && userCartItems.some(item  => item.productId === prod._id)
             ?
             <div className="text-green-600 font-medium mt-2 flex">
          <svg className="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
          </svg>
          Already added to cart
        </div>
            : (
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Add to Cart</button>
            )
        }
    </div>
  )
}
