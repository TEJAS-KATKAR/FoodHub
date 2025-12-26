import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function FoodCard({ item }) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const favKey = "foodhub_favourites";

  // Navigate logic (unchanged)
  const handleClick = () => {
    if (item.source === "mealdb") {
      navigate(`/recipe/${item.id}`);
    } else {
      navigate(`/dataset/${item.id}`);
    }
  };

  // Check if already in favourites
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem(favKey)) || [];
    setIsFav(favs.some((f) => f.id === item.id));
  }, [item.id]);

  // Toggle favourite
  const toggleFavourite = (e) => {
    e.stopPropagation(); // prevent card navigation

    let favs = JSON.parse(localStorage.getItem(favKey)) || [];

    if (isFav) {
      favs = favs.filter((f) => f.id !== item.id);
    } else {
      favs.push(item);
    }

    localStorage.setItem(favKey, JSON.stringify(favs));
    setIsFav(!isFav);
  };

  // First word badge
  const firstWord = item.title?.trim().split(" ")[0];

  return (
    <div
      onClick={handleClick}
      className="group relative min-w-[150px] lg:min-w-[220px]  rounded-xl shadow cursor-pointer overflow-hidden hover:scale-[1.03] transition"
    >
      {/* HEART ICON */}
      <button
        onClick={toggleFavourite}
        className="absolute top-2 right-2 z-20 bg-white/90 rounded-full p-1"
      >
        <Heart
          size={18}
          className={`transition ${
            isFav ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* IMAGE */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-26 lg:h-38 object-cover"
        />
      )}

      {/* TITLE */}
      <div className="p-2 text-sm font-semibold truncate">
        {item.title}
      </div>

      {/* BADGE */}
      {firstWord && (
        <div
          className="
            absolute top-2 left-2
            bg-orange-500 text-white text-xs
            px-2 py-0.5 rounded-full
            opacity-0 group-hover:opacity-100
            transition
            z-10
          "
        >
          {firstWord}
        </div>
      )}
    </div>
  );
}
