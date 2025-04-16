// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, Clock, Gift, Facebook, Twitter, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👗" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" },
    { name: "Sports", icon: "⚽" },
    { name: "Books", icon: "📚" },
  ];

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError("Failed to load products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"
            onClick={() => navigate("/")}>
            MERN Shop
          </a>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block px-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              onClick={() => navigate("/shop")}
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Shop
            </button>
            <button className="p-2 relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Added mt-16 to account for navbar height */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Your Perfect Purchase</h1>
          <p className="text-xl mb-8">Explore millions of products across countless categories</p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              className="w-full py-4 px-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="absolute right-2 top-2 bg-white text-orange-600 py-2 px-6 rounded-full hover:bg-gray-100 transition-all">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer text-center"
            >
              <span className="text-4xl mb-4 inline-block">{category.icon}</span>
              <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
              onClick={() => navigate("/shop")}>
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
                  key={product._id} // Ensure the key is unique
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
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                      <Heart className="w-6 h-6 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Value Propositions */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all orders over $99</p>
          </div>
          <div className="text-center p-6">
            <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">100% protected transactions</p>
          </div>
          <div className="text-center p-6">
            <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Dedicated customer service</p>
          </div>
          <div className="text-center p-6">
            <Gift className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Daily Offers</h3>
            <p className="text-gray-600">Up to 50% discounts</p>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Exclusive Deals</h2>
          <p className="text-gray-400 mb-8">Subscribe to our newsletter for special offers and updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">ShopSphere</h4>
            <p className="text-sm">Your ultimate destination for modern online shopping</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Customer Service</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-500">Returns Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500">Affiliates</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Connect With Us</h5>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
              <Twitter className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
              <Instagram className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>© 2024 ShopSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;