import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items
    .reduce((sum, p) => sum + p.price * (p.quantity ?? 1), 0)
    .toFixed(2);

  if (items.length === 0)
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-gray-600 dark:text-gray-300">
        <h2 className="text-3xl font-bold mb-3">Your cart is empty 🛒</h2>
        <p className="mb-4">Go back and shop your favorite products!</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-8 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 🧾 Cart Items Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Shopping Cart</h2>
            <button
              onClick={() => {
                dispatch(clearCart());
                toast.success("Cart cleared!");
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Deselect all items
            </button>
          </div>

          <div className="divide-y dark:divide-gray-700">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center gap-4 py-6"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity and Remove */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="px-2 py-1 border rounded-md dark:border-gray-600"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium dark:text-white">
                    {item.quantity ?? 1}
                  </span>
                  <button
                    onClick={() => dispatch(incrementQty(item.id))}
                    className="px-2 py-1 border rounded-md dark:border-gray-600"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      toast.error("Item removed");
                    }}
                    className="text-red-500 hover:text-red-600 ml-4"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Order Summary
          </h3>

          <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
            <span>Subtotal ({items.length} items)</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
            <span>Shipping</span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              Free
            </span>
          </div>

          <hr className="dark:border-gray-700 mb-4" />

          <div className="flex justify-between text-lg font-bold dark:text-white mb-6">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={() => toast.success("Proceeding to payment...")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded transition"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
}
