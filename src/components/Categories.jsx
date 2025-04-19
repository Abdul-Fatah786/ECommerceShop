/* eslint-disable no-unused-vars */
import React from "react";

export const Categories = () => {
    const categories = [
      { name: "Electronics", icon: "📱" },
      { name: "Fashion", icon: "👗" },
      { name: "Home & Kitchen", icon: "🏠" },
      { name: "Beauty", icon: "💄" },
      { name: "Sports", icon: "⚽" },
      { name: "Books", icon: "📚" },
    ];
  
    return (
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
    );
  };