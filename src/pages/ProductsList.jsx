/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productSlice";
import { Navbar } from "../components/Navbar";

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-8 mt-8">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full max-w-md px-6 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Product Grid */}
                    {status === 'loading' && (
                        <div className="text-center text-gray-600">Loading products...</div>
                    )}
                    {status === 'failed' && (
                        <div className="text-center text-red-500">Error: {error}</div>
                    )}
                    {status === 'succeeded' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product._id}`} className="block">
                <div className="aspect-square bg-gray-100 relative">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-bold">${product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm hover:bg-orange-200 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductList;