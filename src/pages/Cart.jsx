/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const taxRate = 0.1 // 10% tax rate

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cart')
                console.log(response.data)
                setCartItems(response.data.AllCart)
            } catch (error) {
                console.error('Error fetching cart:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3001/cart/${itemId}`)
            setCartItems(cartItems.filter(item => item._id !== itemId))
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const handleQuantityChange = async (itemId, newQuantity) => {
        const quantity = Math.max(1, newQuantity)
        try {
            await axios.put(`http://localhost:3001/cart/${itemId}`, { quantity })
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, quantity } : item
                )
            )
        } catch (error) {
            console.error('Error updating quantity:', error)
        }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * taxRate
    const total = subtotal + tax

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your cart...</p>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center py-12">
                        <ShoppingCart className="mx-auto h-16 w-16 text-orange-200 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">Start adding items to your cart!</p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Navbar />

            <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                        <ShoppingCart className="mr-3 h-9 w-9 text-orange-600" />
                        Shopping Cart
                    </h1>
                    <Link to="/" className="flex items-center text-orange-600 hover:text-orange-700">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`h-5 w-5 ${i < item.product.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold">
                                        ${item.product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 border-t border-b border-gray-300">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                    <div className="max-w-md ml-auto">
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-600">Tax ({taxRate * 100}%):</span>
                            <span className="font-semibold">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 pt-4 border-t border-gray-200">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-lg font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart