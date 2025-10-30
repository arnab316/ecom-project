import { useEffect, useState } from "react";

const images = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.png",
  "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-64 overflow-hidden rounded-xl shadow-lg mt-4">
      <img
        src={images[index]}
        alt="carousel"
        className="w-full h-full object-cover transition-all duration-700"
      />
    </div>
  );
}
