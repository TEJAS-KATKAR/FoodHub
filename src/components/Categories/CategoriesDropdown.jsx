import React from "react";

export default function CategoriesDropdown({
  categories = [],
  active,
  onSelect,
}) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full border ${
          active === null ? "bg-orange-200" : ""
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            active === cat ? "bg-orange-200" : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
