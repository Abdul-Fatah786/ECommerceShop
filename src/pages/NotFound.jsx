// eslint-disable-next-line no-unused-vars
import React from "react";
import { ShoppingCart, ArrowLeft, Smile, Rocket, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 lg:p-12 text-center">
        <div className="mb-8">
          <ShoppingCart className="mx-auto h-16 w-16 text-orange-600 mb-4" />
          <div className="text-9xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Lost in the Aisles</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you&apos;re looking for seems to have wandered off...
            <Smile className="inline-block ml-2 w-6 h-6 text-amber-600" />
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-100 rounded-lg p-6">
              <Rocket className="w-16 h-16 text-orange-600 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-700 mb-4">
                While we search our inventory, why not...
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 p-3 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p className="mb-2">Still need help? Contact our support team</p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:support@example.com"
              className="text-orange-600 hover:text-orange-700 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Support Center
            </a>
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-orange-100 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotFound;