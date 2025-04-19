/* eslint-disable no-unused-vars */
import React from "react";


export const Newsletter = () => {
    return (
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
    );
  };    