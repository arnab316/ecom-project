import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { removeFromCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty 🛒</h2>
        <p>Go back and add some products!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 container mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center border-b pb-4 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h3 className="font-semibold dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ${item.price}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-600 hover:underline mt-2 md:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 dark:text-white">
        <h3 className="text-xl font-bold">Total:</h3>
        <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          ${total}
        </p>
      </div>

      <button
        onClick={() => toast.success("Payment successful!")}
        className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Proceed to Pay
      </button>
    </div>
  );
}
