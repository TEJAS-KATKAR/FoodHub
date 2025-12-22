import React from "react";


export default function SmoothInfiniteSlider() {
  // Add 10 images — duplicates will be auto-generated
  const images = [
    "https://img.pikbest.com/backgrounds/20210514/sushi-japanese-food-banner_5964063.jpg!bwr800",
    "https://img.freepik.com/premium-photo/pizza-slices-toppings-basil-black-background-3d-vector-template_1061150-85082.jpg?semt=ais_hybrid&w=740&q=80",
    "https://i.pinimg.com/736x/2a/43/5e/2a435ea04f35b21d2f70688aac7accf5.jpg",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/taco-social-media-instagram-post-banner-design-template-51db59b4900b14e3ba51e53280e07418_screen.jpg?ts=1664556985",
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/149e2b99770017.5efa406bee0ab.jpg",
    "https://img.freepik.com/premium-photo/hot-dog-advertisement-hot-dog-with-condiments-it_1242875-866.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevc4yT62UjCk5nh9LrI-i_IjoeW08ajqETw&s",
    "https://cdn3.f-cdn.com//files/download/170332335/Chocolate%20Cake%20Bakery%20Confectionery%20Social%20Media%20Banner%20Design.png?width=780&height=780&fit=crop",
    "https://img.freepik.com/premium-psd/delicious-momos-food-social-media-promotion-instagram-banner-post-design-template_592138-1869.jpg",
    "https://i.pinimg.com/736x/33/fc/a6/33fca69cbcefb82d13067d6d365de51f.jpg",
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
