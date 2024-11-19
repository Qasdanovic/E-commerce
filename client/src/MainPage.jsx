import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Product from "./Products/Product";
import { toast } from 'react-toastify';
import Footer from "./Footer/Footer";
import Category from "./Categories/Category";

export default function MainPage() {
    const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/products/")
          .then((response) => setProducts(response.data))
        // .then((data) => console.log(data))

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
      <Category />

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100" id="products">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {
              products.length > 0 && products.map((prod, index) => {
                return (<Product prod={prod} key={index} />)
              })
            }
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
