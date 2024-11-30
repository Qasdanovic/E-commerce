import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function DeleteProduct() {

    const email = Cookies.get('email');
    const [cartProducts, setCartProducts] = useState([])
    const {id} = useParams()
    console.log(id)

    const navigate = useNavigate()

    useEffect(() => {
        if (email) {
          axios
            .get(`http://localhost:8080/cart/getCartInfo/${email}`)
            .then((response) => {
              setCartProducts(response.data);
              console.log('Fetched cart data:', response.data);
            })
            .catch((error) => {
              console.error('Error fetching cart data:', error);
            });
        }
      }, [email]);

      useEffect(() => {
        if(!cartProducts || !cartProducts.items) return ;
        const filteredProducts = cartProducts?.items?.filter(prod => prod._id !== id )
        const productToDelete = cartProducts?.items?.filter(prod => prod._id === id )
        console.log(filteredProducts)
        console.log(productToDelete)
        try {
          axios.put(`http://localhost:8080/cart/updateCart`, {
            "CartId" : cartProducts._id,
            "userEmail" : email,
            "items" : filteredProducts,
            "totalPrice" : (cartProducts.totalPrice - productToDelete[0].finalPrice).toFixed(2)
        }).then(() => {
          navigate(-1)
        })
    } catch (error) {
      return toast.error("sommething went wrong!")
    }

      }, [id, cartProducts])

  return (
    <div>

    </div>
  )
}
