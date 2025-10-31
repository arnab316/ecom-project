import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import { toggleDarkMode } from "../features/theme/themeSlice";
import type { RootState, } from "../app/store";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  // const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle ALL theme-related side effects here
  useEffect(() => {
    // Update DOM
    document.documentElement.classList.toggle("dark", darkMode);
    
    // Update localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // const handleThemeToggle = () => {
  //   console.log('Theme toggle clicked! Current darkMode:', darkMode);
  //   dispatch(toggleDarkMode());
  // };

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Fake<span className="text-yellow-300">Store</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle - FIXED */}
          {/* <button
            type="button"
            onClick={handleThemeToggle}
            className="relative z-10 bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300 px-3 py-1 rounded-lg font-semibold shadow hover:opacity-90 transition cursor-pointer"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button> */}
        </nav>

        {/* Mobile Menu Button */}
        {/* <button
          type="button"
          onClick={() => {
            console.log('Mobile menu toggle clicked');
            setMenuOpen(!menuOpen);
          }}
          className="md:hidden focus:outline-none z-10"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button> */}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 border-t border-blue-500 dark:border-gray-700 flex flex-col items-start px-6 py-4 gap-3 text-sm font-medium transition-all">
          <Link
            to="/"
            className="w-full py-2 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="w-full py-2 flex items-center gap-2 hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" /> Cart ({cartCount})
          </Link>

          {/* <button
            type="button"
            onClick={() => {
              console.log('Mobile theme toggle clicked! Current darkMode:', darkMode);
              dispatch(toggleDarkMode());
              setMenuOpen(false);
            }}
            className="bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300 px-3 py-1 rounded-lg font-semibold shadow hover:opacity-90 transition cursor-pointer"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button> */}
        </div>
      )}
    </header>
  );
}