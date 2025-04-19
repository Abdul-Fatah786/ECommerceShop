/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { ValuePropositions } from "../components/ValuePropositions";
import { Newsletter } from "../components/NewsLetter";
import { Footer } from "../components/Footer";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts products={products} isLoading={isLoading} error={error} />
      <ValuePropositions />
      <Newsletter />
      <Footer />
    </div>
  );
};
export default HomePage