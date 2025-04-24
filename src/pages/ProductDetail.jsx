/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { Navbar } from "../components/Navbar";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id || typeof id !== "string") {
                    throw new Error("Invalid product ID");
                }

                const response = await axios.get(`http://localhost:3001/products/${id}`);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.response?.data?.message || "Product not found");
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const isInCart = (productId) => {
        return cartItems.some((item) => item._id === productId);
    };

    const handleToggleCart = () => {
        if (product) {
            if (isInCart(product._id)) {
                dispatch(removeFromCart(product._id));
            } else {
                dispatch(addToCart(product));
            }
        }
    };

    if (isLoading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-600">{error}</div>;
    if (!product) return <div className="text-center p-8">Product not found</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8 mt-16">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div className="aspect-square bg-gray-100 rounded-xl">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-gray-600">{product.description}</p>
                            <div className="text-2xl font-bold text-orange-600">
                                ${product.price}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleToggleCart}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                        isInCart(product._id)
                                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                                            : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                                    }`}
                                >
                                    {isInCart(product._id) ? "Remove From Cart" : "Add to Cart"}
                                </button>
                                <button className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="font-semibold mb-2">Product Details</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>Category: {product.category}</li>
                                    <li>Brand: {product.brand}</li>
                                    <li>Stock: {product.stock} available</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
