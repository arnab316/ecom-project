import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import {
  fetchProducts,
  setSearch,
  setSort,
} from "../features/products/productSlice";
import type { RootState, AppDispatch } from "../app/store";
import type { Product } from "../types/product";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, search, sort } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Derived filtered products (pure computation)
  const filtered = useMemo(() => {
    let temp = [...items];
    if (search) {
      const query = search.toLowerCase();
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }
    switch (sort) {
      case "price_low":
        temp.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        temp.sort((a, b) => b.price - a.price);
        break;
      case "az":
        temp.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        temp.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return temp;
  }, [items, search, sort]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    dispatch(addToCart(product));
  };

  if (loading)
    return <p className="mt-8 text-center text-gray-600 dark:text-gray-300">Loading products...</p>;

  return (
    <div className="mt-8 px-4">
      {/* 🔍 Search & Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full md:w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Sort by</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-200 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 truncate">
              {product.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-xs mb-2">
              {product.category}
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-blue-400 mb-4">
              ${product.price}
            </p>

            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">No products found.</p>
      )}
    </div>
  );
}