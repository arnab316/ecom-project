import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 dark:bg-gray-900 text-white mt-10">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* 🏷️ Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3">
            Fake<span className="text-yellow-300">Store</span>
          </h2>
          <p className="text-sm text-blue-100 dark:text-gray-300">
            Your one-stop shop for trendy products and everyday essentials.
            Experience quality and comfort at unbeatable prices.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2 text-blue-100 dark:text-gray-300">
            <li>
              <a href="/" className="hover:text-yellow-300 transition">Home</a>
            </li>
            <li>
              <a href="/cart" className="hover:text-yellow-300 transition">Cart</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* 🛍️ Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Customer Service</h3>
          <ul className="space-y-2 text-blue-100 dark:text-gray-300">
            <li>
              <a href="#" className="hover:text-yellow-300 transition">FAQs</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">Return Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">Shipping Info</a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:support@fakestore.com" className="hover:text-yellow-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500 dark:border-gray-700 text-center py-4 text-sm text-blue-100 dark:text-gray-400">
        © {new Date().getFullYear()} FakeStore. All rights reserved.
      </div>
    </footer>
  );
}
