import { useState, useEffect } from "react";
import { MdArrowRight } from "react-icons/md";
import { FaCaretLeft } from "react-icons/fa";

function HomeCardEffect() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "src/image/48fede5e1b0e76f7.webp",
    "src/image/74f0ad81e44e6e6f.webp",
    "src/image/78c3cfa787e8acbe.webp",
    "src/image/adbc740e1c5ac19b.webp",
    "src/image/1a4568bc09d24278.webp",
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // ✅ Fixed Dependency

  return (
    <div className="relative w-full h-[35%] overflow-hidden">

      {/* Images Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        <FaCaretLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        <MdArrowRight />
      </button>
    </div>
  );
}

export default HomeCardEffect;
