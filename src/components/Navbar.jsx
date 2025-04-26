/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/useAuth";

export const Navbar = () => {
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"
        >
          MERN Shop
        </button>
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
          <button
            onClick={() => navigate("/cart")}
            className="p-2 relative"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-orange-500" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </button>

          <button
            onClick={() => user ? logout() : navigate("/login")}
            className="text-gray-600 hover:text-orange-500 font-medium"
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  );
};