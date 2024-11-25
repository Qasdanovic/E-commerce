import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import Navbar from "../Navbar/Navbar";
import Cookies from "js-cookie"

const ProductInfo = () => {

    const [product, setProduct] = useState({})
    const [userCart, setUserCart] = useState([])
    const navigate = useNavigate()
    const {productId} = useParams()
    const userEmail = Cookies.get('email')

    const [quantity, setQuantity] = useState(1)
    const [finalPrice, setFinalPrice] = useState(product.price && parseFloat(product.price))


    const decrementQuantity = () => {
      if (quantity === 1) return ;
        setQuantity(prev => prev - 1)
    }

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    //useEffect for update price ------------------------------------------------------
    useEffect(() => {
        setFinalPrice(product.price)
        setFinalPrice(product.price * quantity)
    }, [product.price, quantity])
    //  -------------------------------------------------------------------------------

    /**
     * @description get Cart info 
     * @method GET
     */

    useEffect(() => {
      if(userEmail){
        axios.get(`http://localhost:8080/cart/getCartInfo/${userEmail}`).then((response) => {
        setUserCart(response.data)
        })
      }
    }, [userEmail])


    /**
     * ---------------------------------------------------------------------------------
     * @desc useEffect for get product details
     */

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${productId}`)
             .then((response) => setProduct(response.data.result))
    }, [productId])
    /**
     * ----------------------------------------------------------------------------------
     */

    const handelAddToCart = async () => {
      if(!userEmail) return toast.error("you have to ligin first")
        try {
              const items = [];
              items.push(...userCart.items,{ productId , quantity})
              console.log(items)

              await axios.put(`http://localhost:8080/cart/updateCart`, {
                "CartId" : userCart._id,
                "userEmail" : userEmail,
                "items" : items,
                "totalPrice" : finalPrice
            });

            toast.success("added to cart successffuly")
            navigate(-1)
        } catch (error) {
          return toast.error("sommething went wrong!")
          
        }
    }
  
  return (
    <div>
      <Navbar />
        {
            product.title && userCart ?
            (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
    <button onClick={() => navigate(-1)} className="text-indigo-600 hover:underline">Back to Products</button>
    
    <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover my-4 rounded" />
    <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h1>
    <p className="text-lg text-gray-700 mb-4">{product.price}$</p>
    <p className="text-gray-600 mb-4">{product.description}</p>

    <div className="flex items-center mb-4">
      <button 
        onClick={decrementQuantity} 
        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400">
        -
      </button>
      
      <span className="mx-4 text-lg">{quantity}</span>
      
      <button 
        onClick={incrementQuantity} 
        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400">
        +
      </button>
    </div>
    
    <p className="text-lg font-semibold text-gray-800 mb-4">Total: {parseFloat(finalPrice.toFixed(2))}$</p>
    
    <div className="flex space-x-2 mt-4">
      {product.images.map((image, index) => (
        <img key={index} src={image} loading="lazy" alt={`Product Image`} className="w-20 h-20 object-cover rounded" />
      ))}
    </div>
    {
      userCart && userCart.items?.some(item => item.productId === productId) ? 
      (
        <div className="text-green-600 font-medium mt-2 flex">
          <svg className="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
          </svg>
          Already added to cart
        </div>
      ) : 
      (
    <button
      className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500 flex" onClick={handelAddToCart}>
          <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
          </svg>
 Add to Cart
    </button>
      )
    }
  </div>
            ) :
            (
                "loading data"
            )
        }
        
    </div>
  );
};

export default ProductInfo;
