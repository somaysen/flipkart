import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProducts } from "../store/actons/sellerAction"; // ✅ fixed path
import { Loader2, Package, AlertCircle } from "lucide-react";

function SellerProducts() {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector(
    (state) => state.sellerProducts
  );

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg p-6 rounded-2xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Your Products
      </h2>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-center text-red-600 py-10">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          <Package className="w-8 h-8 mx-auto mb-3" />
          No products yet. Add some to see them here.
        </div>
      )}

      {/* Product Grid */}
      {!loading && products.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id || product.title}
              className="border rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
            >
              <img
                src={
                  product.images?.[0] ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-semibold text-indigo-600">
                  {product.currency} {product.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
