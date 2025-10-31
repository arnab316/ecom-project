import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
function App() {
    const location = useLocation();
    const showCarousel = location.pathname === "/";
  return (
    <div className="min-h-screen bg-gray-50  dark:bg-gray-900">
      <Header />
       <main className="mx-auto">   
      {showCarousel && <Carousel />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/category/:name" element={<CategoryPage />} />

      </Routes>
      <Footer />
      </main>
    </div>
  );
}

export default App;
