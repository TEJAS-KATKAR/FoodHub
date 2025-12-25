import React from "react";
import FoodCard from "./FoodCard"

export default function CategoryRow({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-3">
      <h2 className="text-[20px] ml-2 font-bold mb-2">{title}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
