import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from 'axios'
import Product from "./Products/Product";

export default function MainPage() {
    const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      axios.get("https://dummyjson.com/products")
          .then((response) => setProducts(response.data.products))

    } catch (error) {
      console.log('error at getting products')
    }
  }, [])
  
  return (
    <div className="App">
      <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Discover the Best Deals</h1>
          <p className="mt-4 text-lg">Shop our latest products and save big on top brands.</p>
          <Link href="#" className="mt-6 inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="https://via.placeholder.com/100" alt="Category 1" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Electronics</h3>
              <p className="text-gray-600">Discover the latest in electronics</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="https://via.placeholder.com/100" alt="Category 2" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Fashion</h3>
              <p className="text-gray-600">Trendy and stylish fashion items</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="https://via.placeholder.com/100" alt="Category 3" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Home & Garden</h3>
              <p className="text-gray-600">Essentials for your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100" id="products">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {
              products.length > 0 && products.map(prod => {
                return (<Product prod={prod} />)
              })
            }
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 ShopEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </div>
  )
}
