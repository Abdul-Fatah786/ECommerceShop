/* eslint-disable no-unused-vars */
import { Truck, ShieldCheck, Clock, Gift } from "lucide-react";
import React from "react";

export const ValuePropositions = () => {
  return (
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
  );
};