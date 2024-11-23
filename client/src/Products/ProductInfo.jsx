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
        <div className="text-green-600 font-medium mt-2">Already added to cart</div>
      ) : 
      (
    <button
      className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500" onClick={handelAddToCart}>
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
