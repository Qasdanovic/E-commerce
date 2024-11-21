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
    const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/products/")
          .then((response) => setProducts(response.data))
        // .then((data) => console.log(data))

    } catch (error) {
      console.log('error at getting products')
    }
  }, [])

  const handelSearch = () => {
    const productsSearched = products.filter(product => {
      return product.title.toLowerCase().includes(search.toLowerCase())
    })

    setProducts(productsSearched)
  }

  const handelReset = () => {
    axios.get("http://localhost:8080/products/")
          .then((response) => setProducts(response.data))
    setSearch('')
  }

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

       {/* Search Section */}
       <div className="container mx-auto px-6 mt-8 text-center">
       <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Search Product</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value)}}
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-4 py-2 w-2/3 md:w-1/3"
          />
          <button
            className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={handelSearch}
          >
            Search
          </button>
          <button
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={handelReset}
          >
            Reset
          </button>
        </div>

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
