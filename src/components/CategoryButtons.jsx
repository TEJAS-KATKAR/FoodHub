// src/components/CategoryButtons.jsx
import React from "react";

export default function CategoryButtons({ categories = [], active, onClick }) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      <button
        onClick={() => onClick(null)}
        className={`px-4 py-2 rounded-full border ${active === null ? "bg-orange-100" : "bg-white"}`}
      >
        All
      </button>

      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onClick(cat)}
          className={`px-4 py-2 rounded-full border ${active === cat ? "bg-orange-100" : "bg-white"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
