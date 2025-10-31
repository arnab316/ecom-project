import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=1600",
    caption: "Discover Premium Men's Fashion",
  },
  {
    url: "https://images.unsplash.com/photo-1627489105008-063e31b2dbcd?auto=format&fit=crop&q=80&w=1600",
    caption: "Style That Defines You",
  },
  {
    url: "https://images.unsplash.com/photo-1611428813653-aa606c998586?auto=format&fit=crop&q=80&w=1600",
    caption: "Everyday Comfort & Elegance",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg mt-6 group">
      {/* Image Slide */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].url}
          src={images[index].url}
          alt={images[index].caption}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Caption */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/50 flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-white text-xl sm:text-3xl md:text-4xl font-semibold drop-shadow-lg">
          {images[index].caption}
        </h2>
        <button className="mt-4 bg-white/90 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-white transition">
          Shop Now →
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-white scale-110 shadow"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
