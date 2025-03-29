import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";

export default function Carousel() {
  const images = [
    "/clothing.jpg", 
    "/firefighter.jpg", 
    "/foodbank.jpg"
  ];
  const [index, setIndex] = useState(0);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index]);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
         >
         <Image src={images[index]} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white hover:bg-gray-900/80"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white hover:bg-gray-900/80"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-gray-400/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
