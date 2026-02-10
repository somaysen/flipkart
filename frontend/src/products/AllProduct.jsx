import { useEffect } from "react";
import ProductCard from "./ProductCard"; // ✅ import card component
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productActions";

function AllProduct() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Unable to load products</p>
          <p className="text-sm">{typeof error === "string" ? error : "Please try again."}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default AllProduct;
