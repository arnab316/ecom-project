import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types/product";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const filtered = items.filter(
    (p) => p.category.toLowerCase() === decodeURIComponent(name || "").toLowerCase()
  );

  if (loading)
    return <p className="text-center mt-8 dark:text-gray-300">Loading...</p>;

  return (
    <div className="mt-8 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 capitalize dark:text-white">
        {name?.replace("'", "")}
      </h2>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 truncate">
                {product.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                {product.category}
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-blue-400 mb-4">
                ${product.price}
              </p>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
