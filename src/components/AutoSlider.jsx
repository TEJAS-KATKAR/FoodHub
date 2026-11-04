import React from "react";
import slider1 from "./../assets/SliderImages/slider1.webp";
import slider2 from "./../assets/SliderImages/slider2.webp";
import slider3 from "./../assets/SliderImages/slider3.webp";
import slider4 from "./../assets/SliderImages/slider4.webp";
import slider5 from "./../assets/SliderImages/slider5.webp";
import slider6 from "./../assets/SliderImages/slider6.webp";
import slider7 from "./../assets/SliderImages/slider7.webp";
import slider8 from "./../assets/SliderImages/slider8.webp";
import slider9 from "./../assets/SliderImages/slider9.webp";
import slider10 from "./../assets/SliderImages/slider10.webp";

export default function SmoothInfiniteSlider() {
  const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
    slider6,
    slider7,
    slider8,
    slider9,
    slider10,
  ];

  // Duplicate twice for infinite looping
  const looped = [...images, ...images];

  return (
    <div className="relative w-full lg:w-2/3 ml-0 pl-0 overflow-hidden">

      {/* Left blur (DESKTOP ONLY) */}
      <div className="hidden lg:block absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white via-white/70 to-transparent z-20 pointer-events-none"></div>

      {/* Right blur (DESKTOP ONLY) */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-20 bg-linear-to-l from-white via-white/70 to-transparent z-20 pointer-events-none"></div>

      {/* Infinite track */}
      <div className="smooth-track flex gap-2 lg:gap-4 py-2 lg:py-4">
        {looped.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width="180"
            height="120"
            loading={i < 4 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            className="w-[120px] h-20 lg:w-[180px] lg:h-[120px] rounded-lg lg:rounded-xl object-cover shadow-sm lg:shadow-md shrink-0"
          />
        ))}
      </div>

    </div>
  );
}