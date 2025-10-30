import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function Header() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <header className="bg-blue-600 text-white flex justify-between p-4 shadow-md">
      <h1 className="text-xl font-bold">FakeStore</h1>
      <div className="flex items-center space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <div className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold">
          Cart ({cartCount})
        </div>
      </div>
    </header>
  );
}
