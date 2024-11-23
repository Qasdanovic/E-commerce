import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

export default function CartInfo() {
  const [userCart, setUserCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([])
  const email = Cookies.get('email');

  useEffect(() => {
    axios.get(`http://localhost:8080/products/`)
         .then((response) => setAllProducts(response.data))
  }, [])

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/cart/getCartInfo/${email}`)
        .then((response) => {
          setUserCart(response.data);
          console.log('Fetched cart data:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart data:', error);
        });
    }
  }, [email]);

  useEffect(() => {
    let productsWanted = allProducts.filter(prod => {
        return userCart.items?.some(item => item.productId === prod._id)
    })
    setCartProducts(productsWanted)
  }, [userCart, allProducts])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Cart Products:</h1>
        {userCart.items?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">image</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                    cartProducts && cartProducts.map((product, index) =>
                        <tr key={product.id}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={product.images[0]} className='w-10' alt="product_image" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                            <td className="border border-gray-300 px-4 py-2">
                            {product.quantity}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                            <button className="text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded">
                                Edit
                            </button>
                            <button className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded ml-2">
                                Delete
                            </button>
                            </td>
                        </tr>

                    )
                }

              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
