/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

export const FeaturedProducts = ({ products, isLoading, error }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(product._id));
  };
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <button
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            onClick={() => navigate("/shop")}
          >
            See All <span className="ml-2">→</span>
          </button>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-600">Loading trending products...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group relative bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="ml-2 text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    <Heart className="w-6 h-6 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {isInCart(product._id) ? (
                    <button
                      onClick={(e) => handleRemoveFromCart(e, product)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};