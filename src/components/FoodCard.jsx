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

  return (
    <div
      onClick={handleClick}
      className="relative min-w-[180px] w-[180px] bg-white rounded-xl shadow cursor-pointer overflow-hidden hover:scale-[1.03] transition"
    >
      {/* IMAGE (safe render) */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-32 object-cover"
        />
      )}

      <div className="p-2 text-sm font-semibold truncate">
        {item.title}
      </div>

      {/* Optional badge */}
      {item.source === "dataset" && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
          Dataset
        </div>
      )}
    </div>
  );
}
