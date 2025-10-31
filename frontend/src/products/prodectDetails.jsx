import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../store/actons/productActions";
import AllProduct from "./AllProduct";

function ProdectDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((s) => s.productDetails);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    // set first image as default main image
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0f1f1f]">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#0f1f1f]">
        {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0f1f1f] p-6 flex justify-center items-center flex-col gap-8 text-white">
      <div className="max-w-5xl w-full bg-[#111b1b] rounded-2xl shadow-lg overflow-hidden border border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left side - Images */}
          <div>
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-96 object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition transform hover:scale-105 ${
                    mainImage === img
                      ? "border-green-500 scale-105"
                      : "border-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">{product.title}</h1>
              <p className="text-gray-400 mb-3">{product.description}</p>

              <div className="text-2xl font-semibold mb-4">
                {product.price?.currency}{" "}
                {Number(product.price?.amount || 0).toLocaleString()}
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-1 text-gray-200">
                  Seller Details
                </h2>
                <p className="text-gray-400">Seller ID: {product.user_id}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition shadow">
                Add to Cart
              </button>
              <button className="flex-1 bg-[#0b0b0b] text-white border border-gray-700 py-3 rounded-xl hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <AllProduct />
    </div>
  );
}

export default ProdectDetails;
