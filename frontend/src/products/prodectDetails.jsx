import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../store/actons/productActions";
import AllProduct from "./AllProduct";

function ProdectDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((s) => s.productDetails);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center flex-col gap-5">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left: Images */}
          <div>
            <div className="rounded-2xl overflow-hidden border">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="text-2xl font-semibold mb-6">
                {product.price?.currency} {Number(product.price?.amount || 0).toLocaleString()}
              </div>

              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-1">Seller Details</h2>
                <p className="text-gray-700">Seller ID: {product.user_id}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition shadow">
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllProduct/>
    </div>
  );
}

export default ProdectDetails;
