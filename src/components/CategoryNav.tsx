import { Link } from "react-router-dom";

const categories = [
  { name: "men's clothing", label: "Men" },
  { name: "women's clothing", label: "Women" },
  { name: "jewelery", label: "Jewelry" },
  { name: "electronics", label: "Electronics" },
];

export default function CategoryNav() {
  return (
    <nav className="flex flex-wrap gap-3 justify-center mt-2 mb-4">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          to={`/category/${encodeURIComponent(cat.name)}`}
          className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-yellow-300 transition"
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
