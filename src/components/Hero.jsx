/* eslint-disable no-unused-vars */
import React from "react";

export const Hero = () => {
    return (
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
    );
  };