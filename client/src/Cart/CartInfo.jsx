import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

export default function CartInfo() {
  const [userCart, setUserCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([])
  const email = Cookies.get('email');

  /**
   * @desc get all products
   * @method GET
   */
  useEffect(() => {
    axios.get(`http://localhost:8080/products/`)
         .then((response) => setAllProducts(response.data))
  }, [])


  /**
   * @desc get all user cart products
   * @method GET
   */
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

  /**
   * @desc filter cart products
   * @function
   */
  useEffect(() => {
    let productsWanted = allProducts.filter(prod => {
        return userCart.items?.some(item => item.productId === prod._id)
    })
    setCartProducts(productsWanted)
  }, [userCart, allProducts])


  const getQuantity = (product) => {
    let prodWanted = userCart?.items?.find(prod => {
      return prod.productId === product._id
    })
    return prodWanted.quantity
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Cart Products:</h1>
        {userCart.items?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-center" >
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
                                <img src={product.images[0]} style={{width : "100px", marginLeft : "70px"}} alt="product_image" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.price} $</td>
                            <td className="border border-gray-300 px-4 py-2">
                            {getQuantity(product)}
                            </td>
                            <td className="border px-4 py-2">
                              <div className="flex justify-around items-center space-x-2">
                                <button className="text-white  w-2/4 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded transition duration-200 ease-in-out">
                                  Edit
                                </button>
                                <button className="text-white w-2/4 bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition duration-200 ease-in-out">
                                  Delete
                                </button>
                              </div>
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
