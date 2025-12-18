// src/pages/Filters.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "../api/mealdb";
import { getCombinedCategory } from "../services/foodAggregator";
import CategoryRow from "../components/CategoryRow";

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setCategories(cats);

      // Load first 6 categories
      const initial = cats.slice(0, 6);
      const newRows = {};

      for (const c of initial) {
        const items = await getCombinedCategory(c);
        newRows[c] = items;
      }

      setRows(newRows);
    }
    load();
  }, []);

  async function handleCategoryClick(c) {
    setActive(c);

    if (!rows[c]) {
      const items = await getCombinedCategory(c);
      setRows(prev => ({ ...prev, [c]: items }));
    }
  }

  const visibleCategories = active ? [active] : Object.keys(rows);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filter Foods</h1>

      {/* Category Buttons */}
      <div className="flex gap-3 flex-wrap mb-4">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-2 rounded-full border ${active === null ? "bg-orange-200" : ""}`}
        >
          All
        </button>

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-full border ${
              active === cat ? "bg-orange-200" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rows */}
      {visibleCategories.map(cat => (
        <CategoryRow
          key={cat}
          title={cat}
          items={rows[cat] || []}
        />
      ))}
    </div>
  );
}
