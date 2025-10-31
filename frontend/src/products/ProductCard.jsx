import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src={product.images?.[0] || "/no-image.png"}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-green-600">
            {product.price?.amount} {product.price?.currency}
          </span>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
