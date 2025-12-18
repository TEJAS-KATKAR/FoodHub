import React from "react";


export default function SmoothInfiniteSlider() {
  // Add 10 images — duplicates will be auto-generated
  const images = [
    "/slider1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg",
    "/slider5.jpg",
    "/slider6.jpg",
    "/slider7.jpg",
    "/slider8.jpg",
    "/slider9.jpg",
    "/slider10.jpg",
  ];

  // Duplicate 4X for super smooth looping
  const looped = [...images, ...images, ...images, ...images];

  return (
    <div className="relative w-2/3 ml-0 pl-0 overflow-hidden">
      
      {/* Left blur */}
      <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white via-white/70 to-transparent z-20 pointer-events-none"></div>

      {/* Right blur */}
      <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-white via-white/70 to-transparent z-20 pointer-events-none"></div>

      {/* Infinite track */}
      <div className="smooth-track flex gap-4 py-4">
        {looped.map((src, i) => (
          <img
            key={i}
            src={src}
            draggable="false"
            className="w-[180px] h-[120px] rounded-xl object-cover shadow-md shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
