import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const FAV_KEY = "foodhub_favourites";

const getRecipeKey = (item) => `${item.source || "unknown"}-${item.id}`;

export default function FoodCard({ item }) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const handleClick = () => {
    if (item.source === "mealdb") {
      navigate(`/recipe/${item.id}`);
    } else {
      navigate(`/dataset/${item.id}`);
    }
  };

  // Check favourite status whenever this card loads.
  useEffect(() => {
    const checkFavourite = () => {
      try {
        const favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        setIsFav(favs.some((f) => getRecipeKey(f) === getRecipeKey(item)));
      } catch {
        setIsFav(false);
      }
    };

    checkFavourite();

    window.addEventListener("foodhub-favourites-updated", checkFavourite);

    return () => {
      window.removeEventListener("foodhub-favourites-updated", checkFavourite);
    };
  }, [item.id, item.source]);

  const toggleFavourite = (e) => {
    e.stopPropagation();

    let favs = [];

    try {
      favs = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      favs = [];
    }

    const exists = favs.some(
      (f) => getRecipeKey(f) === getRecipeKey(item)
    );

    if (exists) {
      favs = favs.filter(
        (f) => getRecipeKey(f) !== getRecipeKey(item)
      );
    } else {
      favs.push(item);
    }

    localStorage.setItem(FAV_KEY, JSON.stringify(favs));

    setIsFav(!exists);

    window.dispatchEvent(new Event("foodhub-favourites-updated"));
  };

  const firstWord = item.title?.trim().split(" ")[0];

  return (
    <div onClick={handleClick} className="group relative min-w-[150px] lg:min-w-[220px] rounded-xl shadow cursor-pointer overflow-hidden hover:scale-[1.03] transition">
      <button onClick={toggleFavourite} className="absolute top-2 right-2 z-20 bg-white/90 rounded-full p-1">
        <Heart size={18} className={`transition ${isFav ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
      </button>

      {item.image && <img src={item.image} alt={item.title} className="w-full h-26 lg:h-38 object-cover" />}

      <div className="p-2 text-sm font-semibold truncate">{item.title}</div>

      {firstWord && <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition z-10">{firstWord}</div>}
    </div>
  );
}