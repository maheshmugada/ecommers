import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WomenClothes = () => {
 const [products, setProducts] = useState<{ id: number; image: string; title: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Separate fetch function
  const fetchWomenClothes = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/women's clothing"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching women's clothing:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect only calls the function
  useEffect(() => {
    fetchWomenClothes();
  }, []);

  if (loading) return <p className="p-4">Loading women's clothing...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Women's Clothing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenClothes;
