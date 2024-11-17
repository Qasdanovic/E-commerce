import React from 'react'

export default function Product({prod}) {
  
  const addProductToCart = (id) =>{
    console.log(id)
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <img src={prod.images[0]} alt="Product 2" className="w-full h-48 object-cover mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">{prod.title}</h3>
        <p className="text-gray-600">{prod.price}$</p>
        <button onClick={() => addProductToCart(prod.id)} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Add to Cart</button>
    </div>
  )
}
