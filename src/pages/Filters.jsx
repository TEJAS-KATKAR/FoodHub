// src/pages/Filters.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "../api/mealdb";
import { getCombinedCategory } from "../services/foodAggregator";
import CategoryRow from "../components/Categories/CategoryRow";

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState({});
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    async function loadInitial() {
      const cats = await getCategories();
      setCategories(cats);

      const firstFive = cats.slice(0, 5);
      const newRows = {};

      for (const cat of firstFive) {
        const items = await getCombinedCategory(cat);
        newRows[cat] = items;
      }

      setRows(newRows);
    }

    loadInitial();
  }, []);

  async function loadMore() {
    const nextCats = categories.slice(0, visibleCount + 5);
    const newRows = { ...rows };

    for (const cat of nextCats) {
      if (!newRows[cat]) {
        const items = await getCombinedCategory(cat);
        newRows[cat] = items;
      }
    }

    setRows(newRows);
    setVisibleCount((c) => c + 5);
  }

  async function handleFilterClick(cat) {
    setActiveFilter(cat);

    if (!rows[cat]) {
      const items = await getCombinedCategory(cat);
      setRows((prev) => ({ ...prev, [cat]: items }));
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filter Foods</h1>

      
      {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveFilter(null)}
            className={`
              px-5 py-2 rounded-full font-medium
              border transition-all duration-200
              ${
                activeFilter === null
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }
            `}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`
                px-5 py-2 rounded-full font-medium
                border transition-all duration-200
                ${
                  activeFilter === cat
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-orange-100"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

              {/* CATEGORY ROWS */}
              {(activeFilter ? [activeFilter] : Object.keys(rows)).map((cat) => (
                <CategoryRow
                  key={cat}
                  title={cat}
                  items={rows[cat]}
                />
              ))}

      {/* LOAD MORE (ONLY WHEN NO FILTER) */}
      {!activeFilter && visibleCount < categories.length && (
        <button
          onClick={loadMore}
          className="
            mt-8 px-10 py-3
            bg-orange-500 text-white
            rounded-full font-semibold
            shadow-lg
            transition-all duration-300
            hover:scale-110 hover:shadow-xl
            active:scale-95 
          "
        >
          Load more categories
        </button>

      )}
    </div>
  );
}
