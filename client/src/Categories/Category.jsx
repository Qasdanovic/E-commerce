import React from 'react'

export default function Category() {
  return (
    <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="images/tech.jpg" alt="Category 1" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Electronics</h3>
              <p className="text-gray-600">Discover the latest in electronics</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="images/fashion.jpeg" alt="Category 2" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Fashion</h3>
              <p className="text-gray-600">Trendy and stylish fashion items</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src="images/garden.webp" alt="Category 3" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Home & Garden</h3>
              <p className="text-gray-600">Essentials for your home</p>
            </div>
          </div>
        </div>
      </section>
  )
}
