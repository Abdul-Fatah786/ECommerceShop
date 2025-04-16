/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); //ecmpty dependcy why ?

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full max-w-md px-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="text-center text-gray-600">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => (
    <Link
        to={`/product/${product._id}`}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
        <div className="aspect-square bg-gray-100 relative">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <div className="flex justify-between items-center">
                <span className="text-orange-600 font-bold">${product.price}</span>
                <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm hover:bg-orange-200 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    </Link>
);

export default ProductList;