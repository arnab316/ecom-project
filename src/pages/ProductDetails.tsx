import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import type { Product } from "../types/product";
import type { AppDispatch } from "../app/store";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success("Added to cart!");
    }
  };

  const handleProceedToPay = () => {
    toast.success("Redirecting to payment...");
    setTimeout(() => navigate("/cart"), 1000);
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!product) return <p className="text-center mt-8">Product not found!</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/3 h-80 object-contain"
      />

      <div className="flex flex-col justify-between md:w-2/3">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {product.description}
          </p>
          <p className="text-gray-500 mt-2">Category: {product.category}</p>
          <p className="text-yellow-500 font-semibold mt-2">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className="text-3xl font-bold mt-4 text-blue-600 dark:text-blue-400">
            ${product.price}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button
            onClick={handleProceedToPay}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
