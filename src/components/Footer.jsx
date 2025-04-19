/* eslint-disable no-unused-vars */
import { Facebook, Twitter, Instagram } from "lucide-react";
import React from "react";


export const Footer = () => {
  return (
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
  );
};