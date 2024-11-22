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
             <div className="text-green-600 font-medium mt-2">Already added to cart</div>
            : (
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Add to Cart</button>
            )
        }
    </div>
  )
}
