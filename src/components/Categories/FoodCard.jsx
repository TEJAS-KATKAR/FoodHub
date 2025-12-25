import React from "react";
import { useNavigate } from "react-router-dom";

export default function FoodCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.source === "mealdb") {
      navigate(`/recipe/${item.id}`);
    } else {
      navigate(`/dataset/${item.id}`);
    }
  };

  // First word from title (your data confirms this exists)
  const firstWord = item.title?.trim().split(" ")[0];

  return (
    <div
      onClick={handleClick}
      className="group relative min-w-[150px] lg:min-w-[220px]  bg-white rounded-xl shadow cursor-pointer overflow-hidden hover:scale-[1.03] transition"
    >
      {/* IMAGE */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-26 lg:h-38 object-cover z-0 relative"
        />
      )}

      {/* TITLE */}
      <div className="p-2 text-sm font-semibold truncate">
        {item.title}
      </div>

      {/* BADGE (NOW VISIBLE ON HOVER) */}
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
